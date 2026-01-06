import { dadosFerias } from "./data/dadosFerias.js";
        const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        let currentTab = 'programadas';
        let expandedGroups = {};

        

        const MS_PER_DAY = 24 * 60 * 60 * 1000;
        const PROXIMITY_GAP_DAYS = 25; // evita colidir rótulos muito próximos na mesma trilha

        function parseISODateLocal(iso) {
            if (!iso || typeof iso !== 'string') return null;
            const parts = iso.split('-').map(Number);
            if (parts.length !== 3 || parts.some(n => Number.isNaN(n))) return null;
            const [y, m, d] = parts;
            return new Date(y, m - 1, d, 12, 0, 0, 0);
        }

        function toUTCDateNumber(dateObj) {
            return Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
        }

        function diffDays(a, b) {
            return Math.round((toUTCDateNumber(b) - toUTCDateNumber(a)) / MS_PER_DAY);
        }

        function getSelectedYear() {
            const el = document.getElementById('anoFilter');
            const year = Number(el?.value);
            return Number.isFinite(year) ? year : new Date().getFullYear();
        }

        function getYearRange(year) {
            const start = new Date(year, 0, 1, 12, 0, 0, 0);
            const end = new Date(year, 11, 31, 12, 0, 0, 0);
            return { start, end, totalDays: diffDays(start, end) + 1 };
        }

        function isManagerCargo(cargo) {
            return (cargo || '').toUpperCase().includes('GERENTE');
        }

        function normalizeStatus(status) {
            return (status || '').toString().trim().toLowerCase();
        }

        function normalizeTipo(tipo) {
            const raw = (tipo || '').toString().trim().toUpperCase();
            const noAccents = raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            if (noAccents.includes('FERIA')) return 'ferias';
            if (noAccents.includes('FOLGA')) return 'folga';
            if (noAccents.includes('AUSENCIA')) return 'ausencia';
            return 'outros';
        }


        function passesTabFilter(item) {
            const s = normalizeStatus(item.status);

            if (currentTab === 'programadas') {
                return !s || s.includes('definir') || s.includes('program') || s.includes('planej');
            }

            if (currentTab === 'realizadas') {
                if (s.includes('realiz') || s.includes('conclu') || s.includes('execut')) return true;

                // fallback: se já terminou no passado, considera realizada
                const end = parseISODateLocal(item.data_fim) || parseISODateLocal(item.data_inicio);
                if (!end) return false;

                const today = new Date();
                const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0, 0);
                return end < todayMid;
            }

            return true;
        }

        function getActiveFilters() {
            return {
                centro: document.getElementById('centroFilter')?.value || '',
                funcao: document.getElementById('funcaoFilter')?.value || '',
                ano: getSelectedYear(),
                mes: document.getElementById('mesFilter')?.value || '',
                gestor: document.getElementById('gestorFilter')?.value || '',
                funcionario: document.getElementById('funcionarioFilter')?.value || ''
            };
        }

        function getFilteredEvents() {
            const f = getActiveFilters();
            const yr = getYearRange(f.ano);
            const mesNum = f.mes ? Number(f.mes) : null;

            return dadosFerias.filter(item => {
                if (!passesTabFilter(item)) return false;

                if (f.centro && item.local !== f.centro) return false;
                if (f.funcao && item.cargo !== f.funcao) return false;
                if (f.funcionario && item.colaborador !== f.funcionario) return false;
                if (f.gestor === 'sim' && !isManagerCargo(item.cargo)) return false;

                const start0 = parseISODateLocal(item.data_inicio);
                const end0 = parseISODateLocal(item.data_fim) || start0;

                if (mesNum !== null) {
                    if (!start0) return false;
                    if ((start0.getMonth() + 1) !== mesNum) return false;
                }

                if (start0 && end0) {
                    const start = end0 < start0 ? end0 : start0;
                    const end = end0 < start0 ? start0 : end0;
                    if (end < yr.start || start > yr.end) return false;
                } else {
                    // sem datas: só mantém quando não há filtro mensal
                    if (mesNum !== null) return false;
                }

                return true;
            });
        }

        function safeId(str) {
            return (str || '')
                .toString()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '_')
                .replace(/^_+|_+$/g, '');
        }

        function refreshAll() {
            updateStats();
            createChart();
            createTimeline();
        }
        function init() {
            populateFilters();
            refreshAll();
            setupEventListeners();
        }

        function populateFilters() {
            // Centros (Local)
            const centros = [...new Set(dadosFerias.map(d => d.local).filter(Boolean))].sort();
            const centroFilter = document.getElementById('centroFilter');
            while (centroFilter.options.length > 1) centroFilter.remove(1);
            centros.forEach(centro => {
                const option = document.createElement('option');
                option.value = centro;
                option.textContent = centro;
                centroFilter.appendChild(option);
            });

            // Cargos
            const cargos = [...new Set(dadosFerias.map(d => d.cargo).filter(Boolean))].sort();
            const funcaoFilter = document.getElementById('funcaoFilter');
            while (funcaoFilter.options.length > 1) funcaoFilter.remove(1);
            cargos.forEach(cargo => {
                const option = document.createElement('option');
                option.value = cargo;
                option.textContent = cargo;
                funcaoFilter.appendChild(option);
            });

            // Anos (dinâmico a partir das datas)
            const anoFilter = document.getElementById('anoFilter');
            const currentSelected = Number(anoFilter.value) || null;

            const years = [...new Set(
                dadosFerias.flatMap(d => [d.data_inicio, d.data_fim])
                    .filter(Boolean)
                    .map(s => Number(String(s).slice(0, 4)))
                    .filter(y => Number.isFinite(y))
            )].sort((a, b) => a - b);

            const yearsToUse = years.length ? years : [new Date().getFullYear()];
            anoFilter.innerHTML = '';
            yearsToUse.forEach(y => {
                const opt = document.createElement('option');
                opt.value = String(y);
                opt.textContent = String(y);
                anoFilter.appendChild(opt);
            });

            // manter seleção se possível; senão, pegar o maior ano
            if (currentSelected && yearsToUse.includes(currentSelected)) {
                anoFilter.value = String(currentSelected);
            } else {
                anoFilter.value = String(Math.max(...yearsToUse));
            }

            // Meses
            const mesFilter = document.getElementById('mesFilter');
            while (mesFilter.options.length > 1) mesFilter.remove(1);
            meses.forEach((mes, idx) => {
                const option = document.createElement('option');
                option.value = idx + 1;
                option.textContent = mes.charAt(0).toUpperCase() + mes.slice(1);
                mesFilter.appendChild(option);
            });

            // Funcionários
            const colaboradores = [...new Set(dadosFerias.map(d => d.colaborador).filter(Boolean))].sort();
            const funcionarioFilter = document.getElementById('funcionarioFilter');
            while (funcionarioFilter.options.length > 1) funcionarioFilter.remove(1);
            colaboradores.forEach(colab => {
                const option = document.createElement('option');
                option.value = colab;
                option.textContent = colab;
                funcionarioFilter.appendChild(option);
            });
        }

        function updateStats() {
            const filteredEvents = getFilteredEvents();
            const uniqueColabs = new Set(filteredEvents.map(d => d.matricula));
            document.getElementById('totalColaboradores').textContent = uniqueColabs.size;
        }

        function createChart() {
            const f = getActiveFilters();
            const yr = getYearRange(f.ano);
            const monthSets = Array.from({ length: 12 }, () => new Set());

            const filteredEvents = getFilteredEvents();

            filteredEvents.forEach(item => {
                if (item.tipo !== 'FÉRIAS') return;

                const start0 = parseISODateLocal(item.data_inicio);
                if (!start0) return;
                const end0 = parseISODateLocal(item.data_fim) || start0;

                let start = start0;
                let end = end0;
                if (end < start) [start, end] = [end, start];

                // clamp ao ano selecionado
                const clampedStart = start < yr.start ? yr.start : start;
                const clampedEnd = end > yr.end ? yr.end : end;
                if (clampedEnd < yr.start || clampedStart > yr.end || clampedEnd < clampedStart) return;

                const startMonth = clampedStart.getMonth();
                const endMonth = clampedEnd.getMonth();

                for (let m = startMonth; m <= endMonth; m++) {
                    monthSets[m].add(item.matricula);
                }
            });

            const monthCounts = monthSets.map(s => s.size);

            const chartContainer = document.getElementById('chartLine');
            chartContainer.innerHTML = '';

            const maxCount = Math.max(...monthCounts, 1);
            const displayMonths = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

            const titleEl = document.querySelector('.chart-title');
            if (titleEl) titleEl.textContent = 'Qtd. de Funcionários em Férias, Folga ou Ausência/Mês';

            // Dimensões do SVG
            const width = chartContainer.clientWidth || 800;
            const height = 120;
            const paddingX = 30;
            const paddingTop = 25;
            const paddingBottom = 25;
            const chartHeight = height - paddingTop - paddingBottom;

            // Calcular pontos
            const points = monthCounts.map((count, i) => {
                const x = paddingX + (i * (width - 2 * paddingX) / 11);
                const y = paddingTop + chartHeight - (count / maxCount) * chartHeight;
                return { x, y, count };
            });

            // Criar SVG
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');

            // Gradiente para área
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.innerHTML = `
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#8B1538;stop-opacity:0.4"/>
                    <stop offset="100%" style="stop-color:#8B1538;stop-opacity:0.05"/>
                </linearGradient>
            `;
            svg.appendChild(defs);

            // Criar path da área (preenchimento abaixo da linha)
            const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const areaD = `M ${points[0].x} ${paddingTop + chartHeight} ` +
                points.map(p => `L ${p.x} ${p.y}`).join(' ') +
                ` L ${points[11].x} ${paddingTop + chartHeight} Z`;
            areaPath.setAttribute('d', areaD);
            areaPath.setAttribute('class', 'area-path');
            svg.appendChild(areaPath);

            // Criar path da linha
            const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
            linePath.setAttribute('d', lineD);
            linePath.setAttribute('class', 'line-path');
            svg.appendChild(linePath);

            // Criar pontos, valores e labels dos meses
            points.forEach((p, i) => {
                // Valor acima do ponto
                const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                valueText.setAttribute('x', p.x);
                valueText.setAttribute('y', p.y - 10);
                valueText.setAttribute('class', 'point-label');
                valueText.textContent = p.count;
                svg.appendChild(valueText);

                // Ponto (círculo)
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', p.x);
                circle.setAttribute('cy', p.y);
                circle.setAttribute('r', 4);
                circle.setAttribute('class', 'data-point');
                svg.appendChild(circle);

                // Label do mês
                const monthText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                monthText.setAttribute('x', p.x);
                monthText.setAttribute('y', height - 5);
                monthText.setAttribute('class', 'month-label');
                monthText.textContent = displayMonths[i];
                svg.appendChild(monthText);
            });

            chartContainer.appendChild(svg);
        }

        function createTimeline() {
            const content = document.getElementById('timelineContent');
            content.innerHTML = '';

            const f = getActiveFilters();
            const filteredEvents = getFilteredEvents();

            // Base de colaboradores (metadados) + eventos filtrados
            const baseMap = {};
            dadosFerias.forEach(item => {
                if (!baseMap[item.matricula]) {
                    baseMap[item.matricula] = {
                        nome: item.colaborador,
                        matricula: item.matricula,
                        cargo: item.cargo,
                        local: item.local,
                        hierarquia: item.hierarquia,
                        ordem: item.ordem,
                        feriasFiltradas: []
                    };
                }
            });

            filteredEvents.forEach(item => {
                if (!baseMap[item.matricula]) return;
                baseMap[item.matricula].feriasFiltradas.push(item);
            });

            // Colaboradores que possuem pelo menos 1 item após filtros
            let colaboradoresVisiveis = Object.values(baseMap).filter(c => c.feriasFiltradas.length > 0);

            colaboradoresVisiveis.sort((a, b) => {
                const oa = (a.ordem ?? 9999);
                const ob = (b.ordem ?? 9999);
                if (oa !== ob) return oa - ob;
                return (a.nome || '').localeCompare(b.nome || '');
            });

            const includeManagersEmpty = !f.funcionario && !f.funcao && !f.mes && f.gestor !== 'sim';

            // Gerente de Ambiente (se existir)
            const gerenteAmbiente = Object.values(baseMap).find(c => (c.cargo || '').toUpperCase() === 'GERENTE DE AMBIENTE');

            if (gerenteAmbiente && (gerenteAmbiente.feriasFiltradas.length > 0 || includeManagersEmpty)) {
                const groupId = 'gerente_ambiente';

                const groupHeader = document.createElement('div');
                groupHeader.className = 'group-header';
                groupHeader.dataset.groupId = groupId;
                groupHeader.innerHTML = `<span class="expand-icon ${expandedGroups[groupId] !== false ? 'expanded' : ''}">▶</span> GERENTE DE AMBIENTE - ${gerenteAmbiente.local || ''}`;
                groupHeader.addEventListener('click', (e) => toggleGroup(e, groupId));
                content.appendChild(groupHeader);

                const groupContent = document.createElement('div');
                groupContent.id = `group-${groupId}`;
                groupContent.className = 'group-content';
                groupContent.dataset.groupId = groupId;
                groupContent.style.display = expandedGroups[groupId] !== false ? 'block' : 'none';

                createEmployeeRow(gerenteAmbiente, groupContent, 1, gerenteAmbiente.feriasFiltradas);
                content.appendChild(groupContent);
            }

            // Agrupar por Local (CEADE, CESUP, CEQUAM, ...)
            const colabsSemGA = colaboradoresVisiveis.filter(c => (c.cargo || '').toUpperCase() !== 'GERENTE DE AMBIENTE');
            const locals = [...new Set(colabsSemGA.map(c => c.local).filter(Boolean))].sort((a, b) => a.localeCompare(b));

            locals.forEach(local => {
                const groupMembers = colabsSemGA.filter(c => c.local === local);
                if (!groupMembers.length) return;

                // localizar gerente de célula do local (mesmo que ele não tenha eventos filtrados)
                const gerenteCelulaBase = Object.values(baseMap).find(c => c.local === local && (c.cargo || '').toUpperCase() === 'GERENTE DE CÉLULA');
                const gerenteTemEventoNoFiltro = gerenteCelulaBase ? gerenteCelulaBase.feriasFiltradas.length > 0 : false;
                const showGerente = !!gerenteCelulaBase && (gerenteTemEventoNoFiltro || includeManagersEmpty);

                const groupId = `local_${safeId(local)}`;

                const groupHeader = document.createElement('div');
                groupHeader.className = 'group-header';
                groupHeader.dataset.groupId = groupId;

                const headerLabel = showGerente ? `GERENTE DE CÉLULA - ${local}` : `EQUIPE - ${local}`;
                groupHeader.innerHTML = `<span class="expand-icon ${expandedGroups[groupId] !== false ? 'expanded' : ''}">▶</span> ${headerLabel}`;
                groupHeader.addEventListener('click', (e) => toggleGroup(e, groupId));
                content.appendChild(groupHeader);

                const groupContent = document.createElement('div');
                groupContent.id = `group-${groupId}`;
                groupContent.className = 'group-content';
                groupContent.dataset.groupId = groupId;
                groupContent.style.display = expandedGroups[groupId] !== false ? 'block' : 'none';

                if (showGerente) {
                    createEmployeeRow(gerenteCelulaBase, groupContent, 1, gerenteCelulaBase.feriasFiltradas);
                }

                groupMembers
                    .filter(c => !showGerente || c.matricula !== gerenteCelulaBase.matricula)
                    .forEach(sub => {
                        createEmployeeRow(sub, groupContent, showGerente ? 2 : 1, sub.feriasFiltradas);
                    });

                content.appendChild(groupContent);
            });

            if (!content.children.length) {
                const empty = document.createElement('div');
                empty.style.padding = '14px';
                empty.style.color = '#666';
                empty.textContent = 'Nenhum registro encontrado com os filtros atuais.';
                content.appendChild(empty);
            }
        }

        function createEmployeeRow(colab, container, level = 1, feriasList = []) {
            const row = document.createElement('div');
            row.className = 'timeline-row';

            const employeeCell = document.createElement('div');
            employeeCell.className = 'employee-cell';
            employeeCell.style.paddingLeft = `${Math.max(level - 1, 0) * 12}px`;

            const nameDiv = document.createElement('div');
            nameDiv.className = 'employee-name';
            nameDiv.textContent = colab.nome || '';

            const infoDiv = document.createElement('div');
            infoDiv.className = 'employee-id';
            infoDiv.textContent = `${colab.matricula || ''} - ${colab.cargo || ''}`;

            employeeCell.appendChild(nameDiv);
            employeeCell.appendChild(infoDiv);
            row.appendChild(employeeCell);

            const timelineGrid = document.createElement('div');
            timelineGrid.className = 'timeline-grid';

            for (let i = 0; i < 12; i++) {
                const monthCell = document.createElement('div');
                monthCell.className = 'month-cell';
                timelineGrid.appendChild(monthCell);
            }

            // Agrupar por tipo
            const feriasComDatas = (feriasList || []).filter(f => f.data_inicio);
            const porTipo = {
                ferias: feriasComDatas.filter(f => normalizeTipo(f.tipo) === 'ferias'),
                folga: feriasComDatas.filter(f => normalizeTipo(f.tipo) === 'folga'),
                ausencia: feriasComDatas.filter(f => normalizeTipo(f.tipo) === 'ausencia'),
                outros: feriasComDatas.filter(f => normalizeTipo(f.tipo) === 'outros')
            };

            // Organizar sub-trilhas dentro de cada tipo
            const trilhasPorTipo = {
                ferias: organizarEmTrilhas(porTipo.ferias),
                folga: organizarEmTrilhas(porTipo.folga),
                ausencia: organizarEmTrilhas(porTipo.ausencia),
                outros: organizarEmTrilhas(porTipo.outros)
            };

            // Calcular altura necessária baseado no máximo de sub-trilhas
            const maxTrilhasFerias = Math.max(trilhasPorTipo.ferias.length, 1);
            const maxTrilhasFolga = Math.max(trilhasPorTipo.folga.length, 1);
            const maxTrilhasAusencia = Math.max(trilhasPorTipo.ausencia.length + trilhasPorTipo.outros.length, 1);
            
            const alturaBase = 24; // altura de cada barra + margem
            const alturaTotal = (maxTrilhasFerias + maxTrilhasFolga + maxTrilhasAusencia) * alturaBase + 15;
            
            if (alturaTotal > 90) {
                row.style.minHeight = `${alturaTotal}px`;
                timelineGrid.querySelectorAll('.month-cell').forEach(cell => {
                    cell.style.minHeight = `${alturaTotal}px`;
                });
            }

            // Calcular offsets base para cada tipo
            const offsetFerias = 8;
            const offsetFolga = offsetFerias + (maxTrilhasFerias * alturaBase);
            const offsetAusencia = offsetFolga + (maxTrilhasFolga * alturaBase);

            // Adicionar barras com posição calculada
            trilhasPorTipo.ferias.forEach((trilha, subIndex) => {
                trilha.forEach(ferias => {
                    const bar = createVacationBar(ferias, offsetFerias + (subIndex * alturaBase));
                    if (bar) timelineGrid.appendChild(bar);
                });
            });

            trilhasPorTipo.folga.forEach((trilha, subIndex) => {
                trilha.forEach(ferias => {
                    const bar = createVacationBar(ferias, offsetFolga + (subIndex * alturaBase));
                    if (bar) timelineGrid.appendChild(bar);
                });
            });

            trilhasPorTipo.ausencia.forEach((trilha, subIndex) => {
                trilha.forEach(ferias => {
                    const bar = createVacationBar(ferias, offsetAusencia + (subIndex * alturaBase));
                    if (bar) timelineGrid.appendChild(bar);
                });
            });

            trilhasPorTipo.outros.forEach((trilha, subIndex) => {
                const offsetOutros = offsetAusencia + (trilhasPorTipo.ausencia.length * alturaBase);
                trilha.forEach(ferias => {
                    const bar = createVacationBar(ferias, offsetOutros + (subIndex * alturaBase));
                    if (bar) timelineGrid.appendChild(bar);
                });
            });

            row.appendChild(timelineGrid);
            container.appendChild(row);
        }

        function organizarEmTrilhas(feriasArray) {
            const trilhas = [];
            const sorted = [...(feriasArray || [])].sort((a, b) => {
                const da = parseISODateLocal(a.data_inicio);
                const db = parseISODateLocal(b.data_inicio);
                if (!da && !db) return 0;
                if (!da) return 1;
                if (!db) return -1;
                return da - db;
            });

            sorted.forEach(ferias => {
                let adicionada = false;

                for (const trilha of trilhas) {
                    if (!temProximidade(trilha, ferias)) {
                        trilha.push(ferias);
                        adicionada = true;
                        break;
                    }
                }

                if (!adicionada) {
                    trilhas.push([ferias]);
                }
            });

            return trilhas;
        }

        function temProximidade(trilhaFerias, novaFerias) {
            const novoInicio0 = parseISODateLocal(novaFerias.data_inicio);
            const novoFim0 = parseISODateLocal(novaFerias.data_fim) || novoInicio0;
            if (!novoInicio0 || !novoFim0) return false;

            let novoInicio = novoInicio0;
            let novoFim = novoFim0;
            if (novoFim < novoInicio) [novoInicio, novoFim] = [novoFim, novoInicio];

            return (trilhaFerias || []).some(ferias => {
                const inicio0 = parseISODateLocal(ferias.data_inicio);
                const fim0 = parseISODateLocal(ferias.data_fim) || inicio0;
                if (!inicio0 || !fim0) return false;

                let inicio = inicio0;
                let fim = fim0;
                if (fim < inicio) [inicio, fim] = [fim, inicio];

                // sobreposição real
                if (!(novoFim < inicio || novoInicio > fim)) return true;

                // proximidade (gap pequeno) para evitar rótulos colidindo
                if (fim < novoInicio) return diffDays(fim, novoInicio) <= PROXIMITY_GAP_DAYS;
                if (novoFim < inicio) return diffDays(novoFim, inicio) <= PROXIMITY_GAP_DAYS;

                return false;
            });
        }

        function createVacationBar(ferias, topOffset = 8) {
            const year = getSelectedYear();
            const yr = getYearRange(year);

            let startDate = parseISODateLocal(ferias.data_inicio);
            if (!startDate) return null;

            let endDate = parseISODateLocal(ferias.data_fim) || startDate;

            // Normalizar caso venha invertido
            if (endDate < startDate) [startDate, endDate] = [endDate, startDate];

            // Se não intercepta o ano selecionado, não desenha
            if (endDate < yr.start || startDate > yr.end) return null;

            // Clamp ao ano selecionado (para cálculo do desenho)
            const clampedStart = startDate < yr.start ? yr.start : startDate;
            const clampedEnd = endDate > yr.end ? yr.end : endDate;

            const durationDays = diffDays(startDate, endDate) + 1;

            const left = (diffDays(yr.start, clampedStart) / yr.totalDays) * 100;

            const bar = document.createElement('div');
            const tipoClass = normalizeTipo(ferias.tipo);
            bar.className = `vacation-bar ${tipoClass}`;

            // Se estiver muito à direita (>85%), alinhar pela direita para não ultrapassar
            if (left > 85) {
                const right = 100 - left;
                bar.style.right = `${right}%`;
                bar.style.left = 'auto';
            } else {
                bar.style.left = `${left}%`;
            }
            bar.style.top = `${topOffset}px`;

            const formatShort = (d) => {
                const dd = String(d.getDate()).padStart(2, '0');
                const mm = String(d.getMonth() + 1).padStart(2, '0');
                return `${dd}/${mm}`;
            };

            if (durationDays <= 2) {
                bar.classList.add('compact');
                if (durationDays === 1) {
            bar.textContent = formatShort(startDate);  // (só 1 dia)
            } else {
             // 2 dias: formato compacto "09-10/02"
            const dd1 = String(startDate.getDate()).padStart(2, '0');
            const dd2 = String(endDate.getDate()).padStart(2, '0');
            const mm = String(startDate.getMonth() + 1).padStart(2, '0');
            bar.textContent = `${dd1}-${dd2}/${mm}`;
};
                bar.style.fontSize = '8px';
            } else {
                bar.textContent = `${formatShort(startDate)} - ${formatShort(endDate)}`;
                if (durationDays <= 5) bar.style.fontSize = '8px';
            }

            bar.addEventListener('mouseenter', (e) => showTooltip(e, ferias, durationDays, startDate, endDate));
            bar.addEventListener('mouseleave', hideTooltip);

            return bar;
        }

        function showTooltip(event, ferias, durationDays, startDate, endDate) {
            let tooltip = document.getElementById('tooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.id = 'tooltip';
                tooltip.className = 'tooltip';
                document.body.appendChild(tooltip);
            }

            const formatDate = (d) => {
                if (!d) return '-';
                const dd = String(d.getDate()).padStart(2, '0');
                const mm = String(d.getMonth() + 1).padStart(2, '0');
                const yy = d.getFullYear();
                return `${dd}/${mm}/${yy}`;
            };

            tooltip.innerHTML = `
                <strong>${ferias.tipo || ''}</strong><br>
                <strong>Início:</strong> ${formatDate(startDate)}<br>
                <strong>Fim:</strong> ${formatDate(endDate)}<br>
                <strong>Dias:</strong> ${durationDays || '-'}<br>
                <strong>Status:</strong> ${ferias.status || '-'}
            `;

            tooltip.style.display = 'block';

            // posicionar perto do mouse, sem estourar a viewport
            const padding = 12;
            const rect = tooltip.getBoundingClientRect();

            let left = event.pageX + 15;
            let top = event.pageY + 15;

            if (left + rect.width > window.pageXOffset + window.innerWidth - padding) {
                left = event.pageX - rect.width - 15;
            }
            if (top + rect.height > window.pageYOffset + window.innerHeight - padding) {
                top = event.pageY - rect.height - 15;
            }

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        }

        function moveTooltip(e) {
            const tooltip = document.getElementById('tooltip');
            tooltip.style.left = `${e.pageX + 15}px`;
            tooltip.style.top = `${e.pageY + 15}px`;
        }

        function hideTooltip() {
            const tooltip = document.getElementById('tooltip');
            if (tooltip) tooltip.style.display = 'none';
        }

        function toggleGroup(event, groupId) {
            const content = document.getElementById(`group-${groupId}`);
            const icon = event.currentTarget.querySelector('.expand-icon');

            if (!content) return;

            const isCurrentlyExpanded = content.style.display !== 'none';

            if (isCurrentlyExpanded) {
                content.style.display = 'none';
                if (icon) icon.classList.remove('expanded');
                expandedGroups[groupId] = false;
            } else {
                content.style.display = 'block';
                if (icon) icon.classList.add('expanded');
                expandedGroups[groupId] = true;
            }
        }

        function toggleAll() {
            const groupContents = document.querySelectorAll('.group-content');
            if (!groupContents.length) return;

            const allExpanded = Array.from(groupContents).every(gc => gc.style.display !== 'none');

            groupContents.forEach(gc => {
                const groupId = gc.dataset.groupId || gc.id.replace('group-', '');
                const header = document.querySelector(`.group-header[data-group-id="${groupId}"]`);
                const icon = header ? header.querySelector('.expand-icon') : null;

                if (allExpanded) {
                    gc.style.display = 'none';
                    if (icon) icon.classList.remove('expanded');
                    expandedGroups[groupId] = false;
                } else {
                    gc.style.display = 'block';
                    if (icon) icon.classList.add('expanded');
                    expandedGroups[groupId] = true;
                }
            });

            const toggleAllBtn = document.getElementById('toggleAllBtn');
            if (toggleAllBtn) toggleAllBtn.textContent = allExpanded ? 'Expandir Tudo' : 'Recolher Tudo';
        }

        function setupEventListeners() {
            // Tabs
            document.querySelectorAll('.tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    currentTab = tab.dataset.tab;
                    refreshAll();
                });
            });

            // Filtros
            ['centroFilter', 'funcaoFilter', 'anoFilter', 'mesFilter', 'gestorFilter', 'funcionarioFilter'].forEach(filterId => {
                const el = document.getElementById(filterId);
                if (!el) return;
                el.addEventListener('change', () => {
                    refreshAll();
                });
            });

            // Toggle all
            const toggleAllBtn = document.getElementById('toggleAllBtn');
            if (toggleAllBtn) toggleAllBtn.addEventListener('click', toggleAll);

            // Fechar tooltip ao sair da área
            document.addEventListener('scroll', hideTooltip, { passive: true });
        }

        window.addEventListener("DOMContentLoaded", init);

