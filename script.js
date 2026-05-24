/**
 * MKSTREAM STREAMING ENGINE CLIENT PLATFORM LOGIC
 * COMPREHENSIVE INTEGRATION CORE - INCLUDES REAL-TIME LOCAL PREVIEW MAPS,
 * USER GAP POPS AND PARSED MATRIX STRIP ELEMENT REDIRECTIONS.
 */
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================================
    // MODULE 1: LOCAL MATRIX RECOVERY & SEEDED DEFAULT DATA LOOPS
    // ==========================================================================
    let platformDatabase = JSON.parse(localStorage.getItem("mkstream_v2_db")) || {
        anime: [
            { id: "101", subcategory: "trending", title: "The Rising of the Shield Hero", season: "04", episode: "01", thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400", languages: ["Japanese", "English Dub"], subtitles: ["English", "Spanish"], servers: ["Server 1", "Server 2"], mediaType: "url", videoLink: "https://www.w3schools.com/html/mov_bbb.mp4", telegramUrl: "https://t.me/example" },
            { id: "102", subcategory: "continue", title: "Jujutsu Kaisen", season: "02", episode: "25", thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400", languages: ["Japanese"], subtitles: ["English"], servers: ["Server 1"], mediaType: "url", videoLink: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4", telegramUrl: "" }
        ],
        donghua: [], cartoon: [], series: [], serial: []
    };

    let adManagementConfig = JSON.parse(localStorage.getItem("mkstream_ad_rules")) || {
        frequencyGap: 30, // Default allocation frequency boundary configuration parameter
        bannerEnabled: true,
        bannerImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000"
    };

    function saveStateToStorage() {
        localStorage.setItem("mkstream_v2_db", JSON.stringify(platformDatabase));
    }

    // ==========================================================================
    // MODULE 2: CATALOG RUNTIME CAROUSEL RENDER HUB
    // ==========================================================================
    function buildDynamicCatalogGrid() {
        const categories = ["anime", "donghua", "cartoon", "series", "serial"];
        
        categories.forEach(cat => {
            const container = document.getElementById(`${cat}-view-pane`);
            if (!container) return;

            const items = platformDatabase[cat] || [];
            
            // Segregate rows explicitly by assigned subcategory placement
            const trendingItems = items.filter(i => i.subcategory === "trending");
            const continueItems = items.filter(i => i.subcategory === "continue");
            const newestItems = items.filter(i => i.subcategory === "newest");
            const completedItems = items.filter(i => i.subcategory === "completed");

            container.innerHTML = `
                ${renderHorizontalTrack("Trending Now", trendingItems, cat)}
                ${renderHorizontalTrack("Continue Watching", continueItems, cat)}
                ${renderHorizontalTrack("Newest Source Additions", newestItems, cat)}
                ${renderHorizontalTrack("Completed", completedItems, cat)}
            `;
        });
    }

    function renderHorizontalTrack(title, dataArray, categoryKey) {
        if (dataArray.length === 0) {
            return `
                <section class="row-block">
                    <h2 class="row-title">${title}</h2>
                    <div style="font-size:12px; color:var(--text-muted); padding:12px; background:var(--bg-input); border-radius:6px;">No entries registered under this segment.</div>
                </section>
            `;
        }

        let cardsHtml = dataArray.map(item => `
            <div class="poster-card" onclick="launchPlayerTarget('${categoryKey}', '${item.id}')">
                <div class="poster-frame">
                    <span class="ep-badge">S${item.season} : EP${item.episode}</span>
                    <img src="${item.thumbnail}" alt="Thumbnail">
                </div>
                <div class="poster-title">${item.title}</div>
                <div class="poster-sub">${item.languages.join(" | ")}</div>
            </div>
        `).join('');

        return `
            <section class="row-block">
                <h2 class="row-title">${title}</h2>
                <div class="carousel-track-wrapper">
                    <div class="horizontal-scroll-deck">${cardsHtml}</div>
                </div>
            </section>
        `;
    }

    window.launchPlayerTarget = function(cat, id) {
        localStorage.setItem("mkstream_active_cat", cat);
        localStorage.setItem("mkstream_active_id", id);
        window.location.href = "player.html";
    };

    // ==========================================================================
    // MODULE 3: PRODUCTION INTERACTIVE PLAYER DATA FIELD ROUTING MATRIX
    // ==========================================================================
    const primaryVideoPlayer = document.getElementById("primaryVideoPlayer");
    const embeddedFrameHolder = document.getElementById("embeddedFrameHolder");
    let activeLoadedItem = null;

    function initializePlayerSurface() {
        const cat = localStorage.getItem("mkstream_active_cat") || "anime";
        const id = localStorage.getItem("mkstream_active_id");
        if (!id || !platformDatabase[cat]) return;

        activeLoadedItem = platformDatabase[cat].find(i => i.id === id);
        if (!activeLoadedItem) return;

        // Structural Parameter Text Injection Tasks
        document.getElementById("runtimeDisplayTitle").innerText = activeLoadedItem.title;
        document.getElementById("metaFormatLine").innerHTML = `<span>Position Element:</span> ${activeLoadedItem.subcategory.toUpperCase()}`;
        document.getElementById("metaSeasonLine").innerHTML = `<span>Tracking Sequence:</span> Season ${activeLoadedItem.season}, Episode ${activeLoadedItem.episode}`;
        
        // Render explicit selection item matrices instead of toggle components
        populateMatrixSelector("languageSelectionDeck", activeLoadedItem.languages, (selectedLang) => {
            console.log(`Changed current stream target audio channel language to: ${selectedLang}`);
        });

        populateMatrixSelector("serverSelectionDeck", activeLoadedItem.servers, (selectedServer) => {
            console.log(`Rerouted active stream delivery pipe to mirror node line: ${selectedServer}`);
        });

        populateMatrixSelector("subtitleSelectionDeck", activeLoadedItem.subtitles, (selectedSub) => {
            console.log(`Assigned runtime visual translation asset token: ${selectedSub}`);
        });

        // Alternate Stream Allocation Links
        const telegramDeck = document.getElementById("telegramDeckContainer");
        if (telegramDeck) {
            if (activeLoadedItem.telegramUrl) {
                telegramDeck.innerHTML = `<a href="${activeLoadedItem.telegramUrl}" target="_blank" class="telegram-btn"><i class="fa-brands fa-telegram"></i> Access Source via Telegram</a>`;
            } else {
                telegramDeck.innerHTML = `<div style="font-size:11px; color:var(--text-muted);">No alternative Telegram endpoints associated.</div>`;
            }
        }

        executeStreamSourceLoad();
    }

    function populateMatrixSelector(containerId, dataArray, callback) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = "";
        
        if (!dataArray || dataArray.length === 0) {
            container.innerHTML = `<span style="font-size:11px; color:var(--text-muted);">Default Stream Layer Only</span>`;
            return;
        }

        dataArray.forEach((item, index) => {
            const btn = document.createElement("button");
            btn.className = `matrix-node-btn ${index === 0 ? 'active' : ''}`;
            btn.innerText = item;
            btn.addEventListener("click", () => {
                container.querySelectorAll(".matrix-node-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                callback(item);
            });
            container.appendChild(btn);
        });
    }

    function executeStreamSourceLoad() {
        if (!activeLoadedItem) return;

        if (activeLoadedItem.mediaType === "embed") {
            if (primaryVideoPlayer) primaryVideoPlayer.style.display = "none";
            if (embeddedFrameHolder) {
                embeddedFrameHolder.style.display = "block";
                embeddedFrameHolder.innerHTML = activeLoadedItem.videoLink; // Sanitize input code snippet
            }
        } else {
            if (embeddedFrameHolder) embeddedFrameHolder.style.display = "none";
            if (primaryVideoPlayer) {
                primaryVideoPlayer.style.display = "block";
                primaryVideoPlayer.src = activeLoadedItem.videoLink;
                if (document.getElementById("autoplayToggle")?.checked) {
                    primaryVideoPlayer.play().catch(() => console.log("Gesture sequence authorization required."));
                }
            }
        }
    }

    // ==========================================================================
    // MODULE 4: PROGRAMMATIC SPONSOR POPUP INTERVAL RULES ENGINE
    // ==========================================================================
    function triggerUserPopupAdvertisementEvent() {
        const lastPopupTimestamp = localStorage.getItem("mkstream_popup_last_run") || 0;
        const currentTimestamp = Date.now();
        const configuredGapMilliseconds = adManagementConfig.frequencyGap * 60 * 1000;

        if (currentTimestamp - lastPopupTimestamp >= configuredGapMilliseconds) {
            localStorage.setItem("mkstream_popup_last_run", currentTimestamp);
            
            const popOverlay = document.createElement("div");
            popOverlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9999; display:flex; align-items:center; justify-content:center;";
            popOverlay.innerHTML = `
                <div style="background:var(--widget-bg); padding:24px; border-radius:8px; text-align:center; position:relative; max-width:400px; border:2px solid var(--button-active-accent);">
                    <span style="position:absolute; top:4px; right:10px; cursor:pointer; font-weight:bold; color:var(--text-primary);" id='closePopAdNode'>✕</span>
                    <h3 style="color:var(--text-primary); margin-bottom:12px;">Sponsor Placement Preview</h3>
                    <img src="${adManagementConfig.bannerImg}" style="width:100%; border-radius:4px; margin-bottom:12px;">
                    <p style="font-size:11px; color:var(--text-muted);">This popup matches the time gap interval set by the administrator (${adManagementConfig.frequencyGap} minutes).</p>
                </div>
            `;
            document.body.appendChild(popOverlay);
            
            popOverlay.querySelector("#closePopAdNode").addEventListener("click", () => {
                popOverlay.remove();
            });
        } else {
            const remainingMinutes = Math.ceil((configuredGapMilliseconds - (currentTimestamp - lastPopupTimestamp)) / (60 * 1000));
            console.log(`[Ad Frequency Monitor] Next popup event suppressed for ${remainingMinutes} minute(s) to respect session rules.`);
        }
    }

    // Execute frequency audit loops upon route navigation checkpoints
    if (document.getElementById("primaryVideoPlayer") || document.getElementById("catalogDisplayWorkspace")) {
        setTimeout(triggerUserPopupAdvertisementEvent, 2000);
    }

    // Setup active banner instances
    const globalAdChassis = document.getElementById("globalAdChassis");
    if (globalAdChassis && adManagementConfig.bannerEnabled) {
        globalAdChassis.classList.add("active");
        const bannerImg = document.getElementById("adBannerTargetImg");
        if (bannerImg) bannerImg.src = adManagementConfig.bannerImg;
    }

    // ==========================================================================
    // MODULE 5: ADMINISTRATIVE ARCHITECTURE DELETION & MATRIX COMPILERS
    // ==========================================================================
    const adminUploadForm = document.getElementById("adminUploadForm");
    const structuralDeletionTableBody = document.getElementById("structuralDeletionTableBody");

    function updateAdminPanelVisualTables() {
        if (!structuralDeletionTableBody) return;
        structuralDeletionTableBody.innerHTML = "";

        Object.keys(platformDatabase).forEach(categoryKey => {
            platformDatabase[categoryKey].forEach(item => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><strong>${categoryKey.toUpperCase()}</strong></td>
                    <td>${item.subcategory.toUpperCase()}</td>
                    <td>${item.title}</td>
                    <td>S${item.season} : E${item.episode}</td>
                    <td><span style="font-size:10px; font-family:monospace;">${item.videoLink.substring(0, 30)}...</span></td>
                    <td><button class="delete-action-trigger" onclick="purgeMediaNode('${categoryKey}', '${item.id}')">Purge</button></td>
                `;
                structuralDeletionTableBody.appendChild(tr);
            });
        });
    }

    window.purgeMediaNode = function(categoryKey, itemId) {
        if (confirm("Confirm structural deletion of this media node profile?")) {
            platformDatabase[categoryKey] = platformDatabase[categoryKey].filter(i => i.id !== itemId);
            saveStateToStorage();
            updateAdminPanelVisualTables();
            alert("Media entry removed from platform indexes cleanly.");
        }
    };

    if (adminUploadForm) {
        adminUploadForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const category = document.getElementById("admCategory").value;
            const subcategory = document.getElementById("admSubcategory").value;
            const title = document.getElementById("admTitle").value.trim();
            const season = document.getElementById("admSeason").value.trim() || "01";
            const episode = document.getElementById("admEpisode").value.trim() || "01";
            const thumbnail = document.getElementById("admThumbnail").value.trim() || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400";
            const mediaType = document.getElementById("admMediaType").value;
            const videoLink = document.getElementById("admVideoLink").value.trim();
            const telegramUrl = document.getElementById("admTelegramUrl").value.trim();

            // Transform string input data matrices into structural runtime arrays
            const languages = document.getElementById("admLanguages").value.split(",").map(s => s.trim()).filter(Boolean);
            const subtitles = document.getElementById("admSubtitles").value.split(",").map(s => s.trim()).filter(Boolean);
            const servers = document.getElementById("admServers").value.split(",").map(s => s.trim()).filter(Boolean);

            const newContentBlock = {
                id: String(Date.now()),
                subcategory, title, season, episode, thumbnail, languages, subtitles, servers, mediaType, videoLink, telegramUrl
            };

            platformDatabase[category].push(newContentBlock);
            saveStateToStorage();
            adminUploadForm.reset();
            alert("Structural content blocks updated successfully.");
            updateAdminPanelVisualTables();
        });
    }

    // ==========================================================================
    // MODULE 6: MANAGEMENT PANEL PREVIEW ENGINE INTERFACES
    // ==========================================================================
    const adminAdConfigForm = document.getElementById("adminAdConfigForm");
    const admFrequencyGapInput = document.getElementById("admFrequencyGap");
    const admBannerToggle = document.getElementById("admBannerToggle");
    const admBannerImgInput = document.getElementById("admBannerImg");
    const visualBlueprintUrlText = document.getElementById("visualBlueprintUrlText");
    const visualBlueprintImgElement = document.getElementById("visualBlueprintImgElement");

    function renderAdManagementConfigurationFormStates() {
        if (!adminAdConfigForm) return;
        admFrequencyGapInput.value = adManagementConfig.frequencyGap;
        admBannerToggle.checked = adManagementConfig.bannerEnabled;
        admBannerImgInput.value = adManagementConfig.bannerImg;
        
        if (visualBlueprintUrlText) visualBlueprintUrlText.innerText = adManagementConfig.bannerImg;
        if (visualBlueprintImgElement) visualBlueprintImgElement.src = adManagementConfig.bannerImg;
    }

    if (adminAdConfigForm) {
        adminAdConfigForm.addEventListener("submit", (e) => {
            e.preventDefault();
            adManagementConfig.frequencyGap = parseInt(admFrequencyGapInput.value) || 30;
            adManagementConfig.bannerEnabled = admBannerToggle.checked;
            adManagementConfig.bannerImg = admBannerImgInput.value.trim();

            localStorage.setItem("mkstream_ad_rules", JSON.stringify(adManagementConfig));
            renderAdManagementConfigurationFormStates();
            alert("Global promotion pipelines updated successfully.");
        });
    }

    // Runtime Core Ignition Directives
    const currentActivePaneNode = document.getElementById("catalogDisplayWorkspace");
    if (currentActivePaneNode) {
        buildDynamicCatalogGrid();
        
        const tabs = document.querySelectorAll(".nav-item");
        tabs.forEach(t => {
            t.addEventListener("click", () => {
                tabs.forEach(item => item.classList.remove("active"));
                t.classList.add("active");
                
                document.querySelectorAll(".category-view-group").forEach(p => p.classList.remove("active"));
                const targetedPane = document.getElementById(`${t.getAttribute("data-target-category")}-view-pane`);
                if (targetedPane) targetedPane.classList.add("active");
            });
        });
    }

    if (document.getElementById("primaryVideoPlayer") || document.getElementById("embeddedFrameHolder")) {
        initializePlayerSurface();
    }

    if (structuralDeletionTableBody) {
        updateAdminPanelVisualTables();
        renderAdManagementConfigurationFormStates();
    }
});
