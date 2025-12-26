/**
 * Advanced Browser Fingerprinting Library
 * Techniques that users cannot easily change
 * Designed for 98-99% uniqueness
 */

class AdvancedBrowserFingerprint {
    constructor() {
        this.fingerprint = {};
    }

    /**
     * Generate complete advanced fingerprint
     */
    async generate() {
        const results = await Promise.all([
            this.detectWebGLFingerprint(),
            this.detectAudioContext(),
            this.detectCanvasFingerprint(),
            this.detectWebRTCFingerprint(),
            this.detectHardwareConcurrency(),
            this.detectDeviceMemory(),
            this.detectBatteryAPI(),
            this.detectTimezoneOffset(),
            this.detectLanguages(),
            this.detectPlugins(),
            this.detectMimeTypes(),
            this.detectTouchSupport(),
            this.detectMaxTouchPoints(),
            this.detectScreenDetails(),
            this.detectNavigatorProperties(),
            this.detectPerformanceMetrics(),
            this.detectWebGLRenderer(),
            this.detectWebGLVendor(),
            this.detectCanvasTextMetrics(),
            this.detectMathConstants(),
            this.detectErrorStackTrace(),
            this.detectDOMRectPrecision(),
            this.detectSpeechSynthesis(),
            this.detectMediaDevices(),
            this.detectGamepadAPI(),
            this.detectVibrationAPI(),
            this.detectNetworkInformation(),
            this.detectStorageQuota(),
            this.detectIndexedDBQuirks(),
            this.detectWebAssemblySupport()
        ]);

        this.fingerprint = {
            webgl: results[0],
            audio: results[1],
            canvas: results[2],
            webrtc: results[3],
            hardwareConcurrency: results[4],
            deviceMemory: results[5],
            battery: results[6],
            timezone: results[7],
            languages: results[8],
            plugins: results[9],
            mimeTypes: results[10],
            touchSupport: results[11],
            maxTouchPoints: results[12],
            screen: results[13],
            navigator: results[14],
            performance: results[15],
            webglRenderer: results[16],
            webglVendor: results[17],
            canvasTextMetrics: results[18],
            mathConstants: results[19],
            errorStack: results[20],
            domRect: results[21],
            speechSynthesis: results[22],
            mediaDevices: results[23],
            gamepad: results[24],
            vibration: results[25],
            network: results[26],
            storageQuota: results[27],
            indexedDB: results[28],
            webAssembly: results[29]
        };

        return this.fingerprint;
    }

    /**
     * WebGL Fingerprinting - Very stable and unique
     */
    async detectWebGLFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (!gl) return null;

            // Safe parameter getter
            const safeGetParameter = (param) => {
                try {
                    return gl.getParameter(param);
                } catch (e) {
                    return null;
                }
            };

            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            const params = {
                vendor: safeGetParameter(gl.VENDOR),
                renderer: safeGetParameter(gl.RENDERER),
                version: safeGetParameter(gl.VERSION),
                shadingLanguageVersion: safeGetParameter(gl.SHADING_LANGUAGE_VERSION),
                unmaskedVendor: debugInfo ? safeGetParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'not available',
                unmaskedRenderer: debugInfo ? safeGetParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'not available',
                maxTextureSize: safeGetParameter(gl.MAX_TEXTURE_SIZE),
                maxVertexTextureImageUnits: safeGetParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
                maxRenderbufferSize: safeGetParameter(gl.MAX_RENDERBUFFER_SIZE),
                maxViewportDims: safeGetParameter(gl.MAX_VIEWPORT_DIMS),
                maxVertexAttribs: safeGetParameter(gl.MAX_VERTEX_ATTRIBS),
                maxVaryingVectors: safeGetParameter(gl.MAX_VARYING_VECTORS),
                maxFragmentUniformVectors: safeGetParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
                maxVertexUniformVectors: safeGetParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
                aliasedLineWidthRange: safeGetParameter(gl.ALIASED_LINE_WIDTH_RANGE),
                aliasedPointSizeRange: safeGetParameter(gl.ALIASED_POINT_SIZE_RANGE),
                maxCombinedTextureImageUnits: safeGetParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
                maxCubeMapTextureSize: safeGetParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
                maxTextureImageUnits: safeGetParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
                redBits: safeGetParameter(gl.RED_BITS),
                greenBits: safeGetParameter(gl.GREEN_BITS),
                blueBits: safeGetParameter(gl.BLUE_BITS),
                alphaBits: safeGetParameter(gl.ALPHA_BITS),
                depthBits: safeGetParameter(gl.DEPTH_BITS),
                stencilBits: safeGetParameter(gl.STENCIL_BITS),
                extensions: gl.getSupportedExtensions()
            };

            return params;
        } catch (e) {
            return null;
        }
    }

    /**
     * Audio Context Fingerprinting - Hardware-based
     */
    async detectAudioContext() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return null;

            // Create offline context to avoid autoplay policy issues
            const OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
            
            if (OfflineAudioContext) {
                // Use offline context - no autoplay restrictions
                const context = new OfflineAudioContext(1, 44100, 44100);
                const oscillator = context.createOscillator();
                const compressor = context.createDynamicsCompressor();
                
                oscillator.type = 'triangle';
                oscillator.frequency.value = 10000;
                
                oscillator.connect(compressor);
                compressor.connect(context.destination);
                
                oscillator.start(0);
                
                const renderedBuffer = await context.startRendering();
                const channelData = renderedBuffer.getChannelData(0);
                
                let sum = 0;
                for (let i = 0; i < channelData.length; i++) {
                    sum += Math.abs(channelData[i]);
                }
                
                // Get a regular context just for properties (won't start it)
                const regularContext = new AudioContext();
                
                return {
                    audioSum: sum,
                    sampleRate: regularContext.sampleRate,
                    maxChannelCount: regularContext.destination.maxChannelCount,
                    numberOfInputs: regularContext.destination.numberOfInputs,
                    numberOfOutputs: regularContext.destination.numberOfOutputs,
                    channelCount: regularContext.destination.channelCount,
                    state: regularContext.state
                };
            } else {
                // Fallback: just get context properties without starting audio
                const context = new AudioContext();
                return {
                    audioSum: 0,
                    sampleRate: context.sampleRate,
                    maxChannelCount: context.destination.maxChannelCount,
                    numberOfInputs: context.destination.numberOfInputs,
                    numberOfOutputs: context.destination.numberOfOutputs,
                    channelCount: context.destination.channelCount,
                    state: context.state
                };
            }
        } catch (e) {
            return null;
        }
    }

    /**
     * Canvas Fingerprinting - Rendering differences
     */
    async detectCanvasFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 200;
            canvas.height = 50;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });

            // Draw complex shapes with gradients
            const gradient = ctx.createLinearGradient(0, 0, 200, 50);
            gradient.addColorStop(0, 'rgba(102, 204, 0, 0.7)');
            gradient.addColorStop(0.5, 'rgba(217, 64, 52, 0.7)');
            gradient.addColorStop(1, 'rgba(0, 153, 204, 0.7)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 200, 50);
            
            ctx.font = '14px Arial';
            ctx.fillStyle = '#f60';
            ctx.fillText('🎨 Canvas Fingerprint 123', 2, 15);
            
            ctx.font = '18px "Times New Roman"';
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText('Cwm fjordbank glyphs vext quiz', 2, 35);

            const dataURL = canvas.toDataURL();
            
            // Get image data for more detailed hash
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let hash = 0;
            for (let i = 0; i < imageData.data.length; i++) {
                hash = ((hash << 5) - hash) + imageData.data[i];
                hash = hash & hash;
            }

            return {
                dataURL: dataURL.substring(0, 100),
                hash: hash.toString(16)
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * WebRTC Local IP Detection
     */
    async detectWebRTCFingerprint() {
        try {
            const RTCPeerConnection = window.RTCPeerConnection || 
                                     window.mozRTCPeerConnection || 
                                     window.webkitRTCPeerConnection;
            
            if (!RTCPeerConnection) return null;

            return new Promise((resolve) => {
                const pc = new RTCPeerConnection({ iceServers: [] });
                const ips = [];

                pc.createDataChannel('');
                pc.createOffer().then(offer => pc.setLocalDescription(offer));

                pc.onicecandidate = (ice) => {
                    if (!ice || !ice.candidate || !ice.candidate.candidate) {
                        resolve({ localIPs: ips });
                        return;
                    }

                    const parts = ice.candidate.candidate.split(' ');
                    const ip = parts[4];
                    if (ip && ips.indexOf(ip) === -1) {
                        ips.push(ip);
                    }
                };

                setTimeout(() => {
                    pc.close();
                    resolve({ localIPs: ips });
                }, 1000);
            });
        } catch (e) {
            return null;
        }
    }

    /**
     * Hardware Concurrency (CPU cores)
     */
    async detectHardwareConcurrency() {
        return navigator.hardwareConcurrency || null;
    }

    /**
     * Device Memory (RAM)
     */
    async detectDeviceMemory() {
        return navigator.deviceMemory || null;
    }

    /**
     * Battery API
     */
    async detectBatteryAPI() {
        try {
            if (!navigator.getBattery) return null;
            const battery = await navigator.getBattery();
            return {
                charging: battery.charging,
                level: Math.round(battery.level * 100),
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * Timezone Offset
     */
    async detectTimezoneOffset() {
        const date = new Date();
        return {
            offset: date.getTimezoneOffset(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            locale: Intl.DateTimeFormat().resolvedOptions().locale
        };
    }

    /**
     * Languages
     */
    async detectLanguages() {
        return {
            languages: navigator.languages || [navigator.language],
            language: navigator.language
        };
    }

    /**
     * Plugins Detection
     */
    async detectPlugins() {
        const plugins = [];
        for (let i = 0; i < navigator.plugins.length; i++) {
            const plugin = navigator.plugins[i];
            plugins.push({
                name: plugin.name,
                description: plugin.description,
                filename: plugin.filename
            });
        }
        return plugins;
    }

    /**
     * MIME Types
     */
    async detectMimeTypes() {
        const mimeTypes = [];
        for (let i = 0; i < navigator.mimeTypes.length; i++) {
            const mime = navigator.mimeTypes[i];
            mimeTypes.push({
                type: mime.type,
                description: mime.description,
                suffixes: mime.suffixes
            });
        }
        return mimeTypes;
    }

    /**
     * Touch Support
     */
    async detectTouchSupport() {
        return {
            maxTouchPoints: navigator.maxTouchPoints || 0,
            touchEvent: 'ontouchstart' in window,
            touchPoints: 'TouchEvent' in window
        };
    }

    /**
     * Max Touch Points
     */
    async detectMaxTouchPoints() {
        return navigator.maxTouchPoints || 0;
    }

    /**
     * Screen Details
     */
    async detectScreenDetails() {
        return {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth,
            devicePixelRatio: window.devicePixelRatio,
            orientation: screen.orientation ? screen.orientation.type : null,
            angle: screen.orientation ? screen.orientation.angle : null
        };
    }

    /**
     * Navigator Properties
     */
    async detectNavigatorProperties() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            vendor: navigator.vendor,
            vendorSub: navigator.vendorSub,
            productSub: navigator.productSub,
            appVersion: navigator.appVersion,
            appName: navigator.appName,
            appCodeName: navigator.appCodeName,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            onLine: navigator.onLine,
            pdfViewerEnabled: navigator.pdfViewerEnabled
        };
    }

    /**
     * Performance Metrics
     */
    async detectPerformanceMetrics() {
        if (!window.performance) return null;
        
        return {
            memory: performance.memory ? {
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                usedJSHeapSize: performance.memory.usedJSHeapSize
            } : null,
            timing: performance.timing ? {
                navigationStart: performance.timing.navigationStart,
                domContentLoadedEventEnd: performance.timing.domContentLoadedEventEnd
            } : null
        };
    }

    /**
     * WebGL Renderer
     */
    async detectWebGLRenderer() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) return null;
            
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : null;
        } catch (e) {
            return null;
        }
    }

    /**
     * WebGL Vendor
     */
    async detectWebGLVendor() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) return null;
            
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Canvas Text Metrics - Sub-pixel rendering differences
     */
    async detectCanvasTextMetrics() {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            const testStrings = ['mmmmmmmmmmlli', 'ABCDEFGHIJKLM', '🎨🔥💻'];
            const fonts = ['Arial', 'Times New Roman', 'Courier New'];
            
            const metrics = {};
            fonts.forEach(font => {
                testStrings.forEach(text => {
                    ctx.font = `16px ${font}`;
                    const m = ctx.measureText(text);
                    metrics[`${font}:${text}`] = {
                        width: m.width.toFixed(3),
                        actualBoundingBoxAscent: (m.actualBoundingBoxAscent || 0).toFixed(3),
                        actualBoundingBoxDescent: (m.actualBoundingBoxDescent || 0).toFixed(3)
                    };
                });
            });
            
            return metrics;
        } catch (e) {
            return null;
        }
    }

    /**
     * Math Constants - Precision differences
     */
    async detectMathConstants() {
        return {
            e: Math.E.toString(),
            ln2: Math.LN2.toString(),
            ln10: Math.LN10.toString(),
            log2e: Math.LOG2E.toString(),
            log10e: Math.LOG10E.toString(),
            pi: Math.PI.toString(),
            sqrt1_2: Math.SQRT1_2.toString(),
            sqrt2: Math.SQRT2.toString(),
            tan: Math.tan(-1e300).toString(),
            sin: Math.sin(1e300).toString(),
            acos: Math.acos(0.123).toString()
        };
    }

    /**
     * Error Stack Trace Format
     */
    async detectErrorStackTrace() {
        try {
            throw new Error('test');
        } catch (e) {
            const stack = e.stack || '';
            return {
                format: stack.split('\n')[0],
                length: stack.length,
                hasColumn: stack.includes(':')
            };
        }
    }

    /**
     * DOMRect Precision
     */
    async detectDOMRectPrecision() {
        try {
            const div = document.createElement('div');
            div.style.width = '100.5px';
            div.style.height = '50.7px';
            document.body.appendChild(div);
            const rect = div.getBoundingClientRect();
            document.body.removeChild(div);
            
            return {
                width: rect.width.toString(),
                height: rect.height.toString(),
                x: rect.x.toString(),
                y: rect.y.toString()
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * Speech Synthesis Voices
     */
    async detectSpeechSynthesis() {
        try {
            if (!window.speechSynthesis) return null;
            
            return new Promise((resolve) => {
                let voices = speechSynthesis.getVoices();
                if (voices.length > 0) {
                    resolve(voices.map(v => ({ name: v.name, lang: v.lang })));
                } else {
                    speechSynthesis.onvoiceschanged = () => {
                        voices = speechSynthesis.getVoices();
                        resolve(voices.map(v => ({ name: v.name, lang: v.lang })));
                    };
                    setTimeout(() => resolve([]), 1000);
                }
            });
        } catch (e) {
            return null;
        }
    }

    /**
     * Media Devices
     */
    async detectMediaDevices() {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                return null;
            }
            
            const devices = await navigator.mediaDevices.enumerateDevices();
            return {
                audioInput: devices.filter(d => d.kind === 'audioinput').length,
                audioOutput: devices.filter(d => d.kind === 'audiooutput').length,
                videoInput: devices.filter(d => d.kind === 'videoinput').length
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * Gamepad API
     */
    async detectGamepadAPI() {
        try {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            return {
                supported: 'getGamepads' in navigator,
                count: gamepads.filter(g => g !== null).length
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * Vibration API
     */
    async detectVibrationAPI() {
        return 'vibrate' in navigator;
    }

    /**
     * Network Information
     */
    async detectNetworkInformation() {
        try {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (!connection) return null;
            
            return {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * Storage Quota
     */
    async detectStorageQuota() {
        try {
            if (!navigator.storage || !navigator.storage.estimate) return null;
            
            const estimate = await navigator.storage.estimate();
            return {
                quota: estimate.quota,
                usage: estimate.usage,
                ratio: (estimate.usage / estimate.quota).toFixed(6)
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * IndexedDB Quirks
     */
    async detectIndexedDBQuirks() {
        try {
            if (!window.indexedDB) return null;
            
            return {
                supported: true,
                databases: indexedDB.databases ? 'supported' : 'not_supported'
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * WebAssembly Support
     */
    async detectWebAssemblySupport() {
        try {
            if (typeof WebAssembly === 'undefined') return null;
            
            return {
                supported: true,
                instantiate: typeof WebAssembly.instantiate === 'function',
                compile: typeof WebAssembly.compile === 'function'
            };
        } catch (e) {
            return null;
        }
    }

    /**
     * Generate deterministic hash (only stable features)
     */
    getHash() {
        // Only use STABLE features that don't change
        const stableFeatures = [
            // WebGL - Very stable
            `webgl:${this.fingerprint.webglRenderer}`,
            `webgl_vendor:${this.fingerprint.webglVendor}`,
            this.fingerprint.webgl?.version || '',
            this.fingerprint.webgl?.shadingLanguageVersion || '',
            (this.fingerprint.webgl?.extensions || []).sort().join(','),
            
            // Audio - Stable (audioSum is consistent)
            `audio:${this.fingerprint.audio?.audioSum?.toFixed(2) || ''}`,
            `audio_sr:${this.fingerprint.audio?.sampleRate || ''}`,
            `audio_ch:${this.fingerprint.audio?.maxChannelCount || ''}`,
            
            // Canvas - Stable
            `canvas:${this.fingerprint.canvas?.hash || ''}`,
            
            // Hardware - Very stable
            `hw_cores:${this.fingerprint.hardwareConcurrency || ''}`,
            `hw_mem:${this.fingerprint.deviceMemory || ''}`,
            
            // Screen - Stable
            `screen:${this.fingerprint.screen?.width}x${this.fingerprint.screen?.height}`,
            `screen_depth:${this.fingerprint.screen?.colorDepth}`,
            `screen_dpr:${this.fingerprint.screen?.devicePixelRatio}`,
            
            // Timezone - Stable
            `tz:${this.fingerprint.timezone?.timezone || ''}`,
            `tz_offset:${this.fingerprint.timezone?.offset || ''}`,
            
            // Languages - Stable
            `lang:${(this.fingerprint.languages?.languages || []).join(',')}`,
            
            // Math Constants - Very stable
            `math_tan:${this.fingerprint.mathConstants?.tan || ''}`,
            `math_sin:${this.fingerprint.mathConstants?.sin || ''}`,
            `math_acos:${this.fingerprint.mathConstants?.acos || ''}`,
            
            // Canvas Text Metrics - Stable
            JSON.stringify(this.fingerprint.canvasTextMetrics || {}),
            
            // Navigator - Stable
            `platform:${this.fingerprint.navigator?.platform || ''}`,
            `vendor:${this.fingerprint.navigator?.vendor || ''}`,
            
            // Touch - Stable
            `touch:${this.fingerprint.maxTouchPoints || 0}`,
            
            // Speech Synthesis - Stable
            `speech:${(this.fingerprint.speechSynthesis || []).length}`,
            
            // Plugins - Stable
            `plugins:${(this.fingerprint.plugins || []).length}`,
            
            // Error Stack - Stable
            `error:${this.fingerprint.errorStack?.format || ''}`,
            
            // DOMRect - Stable
            `rect:${this.fingerprint.domRect?.width || ''}x${this.fingerprint.domRect?.height || ''}`
            
            // EXCLUDED (unstable):
            // - battery (changes constantly)
            // - network (changes with connection)
            // - performance.memory (changes constantly)
            // - storageQuota (changes with usage)
        ];
        
        const str = stableFeatures.join('|');
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
            hash = hash >>> 0;
        }
        return hash.toString(16);
    }

    /**
     * Get compact fingerprint
     */
    getCompact() {
        return {
            webglRenderer: this.fingerprint.webglRenderer,
            webglVendor: this.fingerprint.webglVendor,
            canvasHash: this.fingerprint.canvas?.hash,
            audioSum: this.fingerprint.audio?.audioSum,
            hardwareConcurrency: this.fingerprint.hardwareConcurrency,
            deviceMemory: this.fingerprint.deviceMemory,
            timezone: this.fingerprint.timezone?.timezone,
            screenResolution: `${this.fingerprint.screen?.width}x${this.fingerprint.screen?.height}`,
            hash: this.getHash()
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedBrowserFingerprint;
}

/**
 * CSS Fingerprinting Library
 * 
 * This library detects browser-specific CSS rendering behaviors that users cannot easily change.
 * It creates a unique fingerprint based on:
 * - CSS property support detection
 * - Font rendering metrics
 * - CSS media query support
 * - Browser-specific CSS quirks
 * - Scrollbar dimensions
 * - Color rendering precision
 */

class CSSFingerprint {
    constructor() {
        this.fingerprint = {};
    }

    /**
     * Generate complete CSS fingerprint
     */
    async generate() {
        this.fingerprint = {
            cssProperties: this.detectCSSProperties(),
            fontMetrics: this.detectFontMetrics(),
            mediaQueries: this.detectMediaQueries(),
            scrollbar: this.detectScrollbarDimensions(),
            colorPrecision: this.detectColorPrecision(),
            cssFilters: this.detectCSSFilters(),
            cssTransforms: this.detectCSSTransforms(),
            cssBlending: this.detectCSSBlending(),
            cssGrid: this.detectCSSGrid(),
            cssVariables: this.detectCSSVariables(),
            fontList: await this.detectAvailableFonts(),
            emojiRendering: this.detectEmojiRendering(),
            textRendering: this.detectTextRendering(),
            borderRadius: this.detectBorderRadiusQuirks(),
            boxShadow: this.detectBoxShadowQuirks()
            // timestamp kaldırıldı - deterministik hash için
        };

        return this.fingerprint;
    }

    /**
     * Detect CSS property support
     */
    detectCSSProperties() {
        const testDiv = document.createElement('div');
        const properties = [
            'backdropFilter',
            'webkitBackdropFilter',
            'maskImage',
            'webkitMaskImage',
            'clipPath',
            'webkitClipPath',
            'filter',
            'webkitFilter',
            'mixBlendMode',
            'isolation',
            'willChange',
            'contain',
            'touchAction',
            'overscrollBehavior',
            'scrollSnapType',
            'scrollBehavior',
            'textDecorationStyle',
            'textDecorationColor',
            'textDecorationLine',
            'fontVariantLigatures',
            'fontVariantCaps',
            'fontFeatureSettings',
            'hyphens',
            'textOrientation',
            'writingMode',
            'imageRendering',
            'objectFit',
            'objectPosition',
            'shapeOutside',
            'shapeMargin',
            'columnCount',
            'columnGap',
            'gridTemplateColumns',
            'gridTemplateRows',
            'gap',
            'placeItems',
            'aspectRatio',
            'accentColor',
            'colorScheme',
            'contentVisibility',
            'overflowAnchor'
        ];

        const supported = {};
        properties.forEach(prop => {
            supported[prop] = testDiv.style[prop] !== undefined;
        });

        return supported;
    }

    /**
     * Detect font rendering metrics
     */
    detectFontMetrics() {
        const testFonts = [
            'Arial', 'Helvetica', 'Times New Roman', 'Courier New',
            'Verdana', 'Georgia', 'Comic Sans MS', 'Trebuchet MS',
            'Arial Black', 'Impact', 'Tahoma', 'Calibri'
        ];

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        canvas.width = 200;
        canvas.height = 50;

        const metrics = {};
        testFonts.forEach(font => {
            ctx.font = `16px "${font}"`;
            const text = 'mmmmmmmmmmlli';
            const measurement = ctx.measureText(text);
            
            // Round to 1 decimal place for stability
            metrics[font] = {
                width: Math.round(measurement.width * 10) / 10,
                actualBoundingBoxAscent: Math.round((measurement.actualBoundingBoxAscent || 0) * 10) / 10,
                actualBoundingBoxDescent: Math.round((measurement.actualBoundingBoxDescent || 0) * 10) / 10,
                fontBoundingBoxAscent: Math.round((measurement.fontBoundingBoxAscent || 0) * 10) / 10,
                fontBoundingBoxDescent: Math.round((measurement.fontBoundingBoxDescent || 0) * 10) / 10
            };
        });

        return metrics;
    }

    /**
     * Detect media query support
     */
    detectMediaQueries() {
        const queries = [
            '(prefers-color-scheme: dark)',
            '(prefers-reduced-motion: reduce)',
            '(prefers-contrast: high)',
            '(prefers-reduced-transparency: reduce)',
            '(inverted-colors: inverted)',
            '(forced-colors: active)',
            '(hover: hover)',
            '(pointer: fine)',
            '(any-hover: hover)',
            '(any-pointer: fine)',
            '(display-mode: standalone)',
            '(display-mode: fullscreen)',
            '(-webkit-device-pixel-ratio: 1)',
            '(resolution: 1dppx)',
            '(orientation: portrait)',
            '(update: fast)',
            '(overflow-block: scroll)',
            '(overflow-inline: scroll)',
            '(color-gamut: srgb)',
            '(dynamic-range: standard)'
        ];

        const results = {};
        queries.forEach(query => {
            results[query] = window.matchMedia(query).matches;
        });

        return results;
    }

    /**
     * Detect scrollbar dimensions
     */
    detectScrollbarDimensions() {
        const outer = document.createElement('div');
        outer.style.cssText = 'position:absolute;top:-9999px;width:100px;height:100px;overflow:scroll;visibility:hidden';
        document.body.appendChild(outer);

        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '100%';
        outer.appendChild(inner);

        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        const scrollbarHeight = outer.offsetHeight - inner.offsetHeight;

        document.body.removeChild(outer);

        return {
            width: scrollbarWidth,
            height: scrollbarHeight
        };
    }

    /**
     * Detect color rendering precision
     */
    detectColorPrecision() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        // Test subtle color differences
        const testColors = [
            'rgb(1, 2, 3)',
            'rgb(254, 253, 252)',
            'rgba(128, 128, 128, 0.5)',
            'rgba(255, 255, 255, 0.01)'
        ];

        const results = {};
        testColors.forEach(color => {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            const imageData = ctx.getImageData(0, 0, 1, 1).data;
            results[color] = Array.from(imageData).join(',');
        });

        return results;
    }

    /**
     * Detect CSS filter support and rendering
     */
    detectCSSFilters() {
        const testDiv = document.createElement('div');
        testDiv.style.cssText = 'position:absolute;top:-9999px;width:100px;height:100px;';
        document.body.appendChild(testDiv);

        const filters = [
            'blur(5px)',
            'brightness(0.5)',
            'contrast(200%)',
            'grayscale(100%)',
            'hue-rotate(90deg)',
            'invert(100%)',
            'opacity(50%)',
            'saturate(200%)',
            'sepia(100%)',
            'drop-shadow(5px 5px 5px black)'
        ];

        const results = {};
        filters.forEach(filter => {
            testDiv.style.filter = filter;
            results[filter] = testDiv.style.filter !== '';
        });

        document.body.removeChild(testDiv);
        return results;
    }

    /**
     * Detect CSS transform support
     */
    detectCSSTransforms() {
        const testDiv = document.createElement('div');
        testDiv.style.cssText = 'position:absolute;top:-9999px;';
        document.body.appendChild(testDiv);

        const transforms = [
            'matrix(1, 0, 0, 1, 0, 0)',
            'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)',
            'perspective(500px)',
            'rotate(45deg)',
            'rotate3d(1, 1, 1, 45deg)',
            'rotateX(45deg)',
            'rotateY(45deg)',
            'rotateZ(45deg)',
            'scale(2)',
            'scale3d(2, 2, 2)',
            'scaleX(2)',
            'scaleY(2)',
            'scaleZ(2)',
            'skew(10deg, 10deg)',
            'skewX(10deg)',
            'skewY(10deg)',
            'translate(10px, 10px)',
            'translate3d(10px, 10px, 10px)',
            'translateX(10px)',
            'translateY(10px)',
            'translateZ(10px)'
        ];

        const results = {};
        transforms.forEach(transform => {
            testDiv.style.transform = transform;
            results[transform] = testDiv.style.transform !== '';
        });

        document.body.removeChild(testDiv);
        return results;
    }

    /**
     * Detect CSS blending modes
     */
    detectCSSBlending() {
        const testDiv = document.createElement('div');
        const modes = [
            'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
            'color-dodge', 'color-burn', 'hard-light', 'soft-light',
            'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'
        ];

        const results = {};
        modes.forEach(mode => {
            testDiv.style.mixBlendMode = mode;
            results[mode] = testDiv.style.mixBlendMode === mode;
        });

        return results;
    }

    /**
     * Detect CSS Grid support
     */
    detectCSSGrid() {
        const testDiv = document.createElement('div');
        testDiv.style.display = 'grid';
        
        return {
            supported: testDiv.style.display === 'grid',
            subgrid: CSS.supports && CSS.supports('grid-template-columns', 'subgrid'),
            masonry: CSS.supports && CSS.supports('grid-template-rows', 'masonry')
        };
    }

    /**
     * Detect CSS Variables support
     */
    detectCSSVariables() {
        return {
            supported: window.CSS && CSS.supports && CSS.supports('--test', '0'),
            env: CSS.supports && CSS.supports('padding', 'env(safe-area-inset-top)')
        };
    }

    /**
     * Detect available fonts using canvas measurement
     */
    async detectAvailableFonts() {
        const baseFonts = ['monospace', 'sans-serif', 'serif'];
        const testFonts = [
            'Arial', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS',
            'Times New Roman', 'Georgia', 'Garamond', 'Courier New',
            'Brush Script MT', 'Comic Sans MS', 'Impact', 'Lucida Sans Unicode',
            'Calibri', 'Cambria', 'Consolas', 'Segoe UI', 'Candara',
            'Franklin Gothic Medium', 'Arial Black', 'Palatino Linotype',
            'Book Antiqua', 'Lucida Console', 'MS Sans Serif', 'MS Serif',
            'Roboto', 'Open Sans', 'Montserrat', 'Lato', 'Source Sans Pro',
            'Noto Sans', 'Ubuntu', 'Raleway', 'Oswald', 'PT Sans',
            'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji'
        ];

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const testString = 'mmmmmmmmmmlli';
        const fontSize = '72px';

        // Get baseline measurements
        const baseMeasurements = {};
        baseFonts.forEach(baseFont => {
            ctx.font = `${fontSize} ${baseFont}`;
            baseMeasurements[baseFont] = ctx.measureText(testString).width;
        });

        // Test each font
        const availableFonts = [];
        testFonts.forEach(testFont => {
            let detected = false;
            baseFonts.forEach(baseFont => {
                ctx.font = `${fontSize} "${testFont}", ${baseFont}`;
                const width = ctx.measureText(testString).width;
                if (width !== baseMeasurements[baseFont]) {
                    detected = true;
                }
            });
            if (detected) {
                availableFonts.push(testFont);
            }
        });

        return availableFonts;
    }

    /**
     * Detect emoji rendering
     */
    detectEmojiRendering() {
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 50;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const emojis = ['😀', '🎨', '🔥', '💻', '🌈'];
        const results = {};

        emojis.forEach(emoji => {
            ctx.clearRect(0, 0, 50, 50);
            ctx.font = '30px Arial';
            ctx.fillText(emoji, 10, 35);
            const imageData = ctx.getImageData(0, 0, 50, 50).data;
            
            // Calculate a simple hash of the rendered emoji
            let hash = 0;
            for (let i = 0; i < imageData.length; i += 4) {
                hash = ((hash << 5) - hash) + imageData[i] + imageData[i+1] + imageData[i+2];
                hash = hash & hash;
            }
            results[emoji] = hash;
        });

        return results;
    }

    /**
     * Detect text rendering quirks
     */
    detectTextRendering() {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 50;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const testStrings = [
            { text: 'The quick brown fox', font: '16px Arial' },
            { text: 'ABCDEFGHIJKLM', font: '16px monospace' },
            { text: 'abcdefghijklm', font: '16px serif' }
        ];

        const results = {};
        testStrings.forEach(({ text, font }) => {
            ctx.font = font;
            const metrics = ctx.measureText(text);
            // Round to 1 decimal place for stability
            results[`${font}:${text}`] = {
                width: Math.round(metrics.width * 10) / 10,
                ascent: Math.round((metrics.actualBoundingBoxAscent || 0) * 10) / 10,
                descent: Math.round((metrics.actualBoundingBoxDescent || 0) * 10) / 10
            };
        });

        return results;
    }

    /**
     * Detect border-radius rendering quirks
     */
    detectBorderRadiusQuirks() {
        const testDiv = document.createElement('div');
        testDiv.style.cssText = 'position:absolute;top:-9999px;width:100px;height:100px;border-radius:50%;';
        document.body.appendChild(testDiv);

        const computed = window.getComputedStyle(testDiv);
        const result = {
            borderRadius: computed.borderRadius,
            borderTopLeftRadius: computed.borderTopLeftRadius,
            borderTopRightRadius: computed.borderTopRightRadius,
            borderBottomLeftRadius: computed.borderBottomLeftRadius,
            borderBottomRightRadius: computed.borderBottomRightRadius
        };

        document.body.removeChild(testDiv);
        return result;
    }

    /**
     * Detect box-shadow rendering quirks
     */
    detectBoxShadowQuirks() {
        const testDiv = document.createElement('div');
        testDiv.style.cssText = 'position:absolute;top:-9999px;width:100px;height:100px;box-shadow:5px 5px 10px rgba(0,0,0,0.5);';
        document.body.appendChild(testDiv);

        const computed = window.getComputedStyle(testDiv);
        const result = computed.boxShadow;

        document.body.removeChild(testDiv);
        return result;
    }

    /**
     * Get hash of the fingerprint (deterministic)
     */
    getHash() {
        // Sadece stabil özellikleri kullan ve sıralı şekilde birleştir
        const stableFeatures = [
            // Scrollbar (en stabil)
            `sb:${this.fingerprint.scrollbar?.width || 0}x${this.fingerprint.scrollbar?.height || 0}`,
            
            // CSS Grid & Variables
            `grid:${this.fingerprint.cssGrid?.supported || false}`,
            `subgrid:${this.fingerprint.cssGrid?.subgrid || false}`,
            `vars:${this.fingerprint.cssVariables?.supported || false}`,
            
            // Font count (tam liste yerine sadece sayı)
            `fonts:${this.fingerprint.fontList?.length || 0}`,
            
            // CSS Properties (alfabetik sırada)
            ...Object.keys(this.fingerprint.cssProperties || {}).sort().map(key =>
                `prop:${key}:${this.fingerprint.cssProperties[key]}`
            ),
            
            // Media Queries (alfabetik sırada)
            ...Object.keys(this.fingerprint.mediaQueries || {}).sort().map(key =>
                `mq:${key}:${this.fingerprint.mediaQueries[key]}`
            ),
            
            // CSS Filters (alfabetik sırada)
            ...Object.keys(this.fingerprint.cssFilters || {}).sort().map(key =>
                `filter:${key}:${this.fingerprint.cssFilters[key]}`
            ),
            
            // CSS Blending (alfabetik sırada)
            ...Object.keys(this.fingerprint.cssBlending || {}).sort().map(key =>
                `blend:${key}:${this.fingerprint.cssBlending[key]}`
            ),
            
            // Font Metrics (sadece width değerleri, alfabetik sırada, 1 decimal)
            ...Object.keys(this.fingerprint.fontMetrics || {}).sort().map(key =>
                `fm:${key}:${this.fingerprint.fontMetrics[key].width.toFixed(1)}`
            ),
            
            // Emoji Rendering (sıralı)
            ...Object.keys(this.fingerprint.emojiRendering || {}).sort().map(key =>
                `emoji:${key}:${this.fingerprint.emojiRendering[key]}`
            ),
            
            // Box Shadow & Border Radius
            `shadow:${this.fingerprint.boxShadow || ''}`,
            `radius:${this.fingerprint.borderRadius?.borderRadius || ''}`
        ];
        
        // Deterministik string oluştur
        const str = stableFeatures.join('|');
        
        // Daha iyi hash algoritması (djb2)
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
            hash = hash >>> 0; // Convert to unsigned 32-bit integer
        }
        
        return hash.toString(16);
    }

    /**
     * Get compact fingerprint (only the most stable features)
     */
    getCompactFingerprint() {
        return {
            scrollbarWidth: this.fingerprint.scrollbar?.width || 0,
            scrollbarHeight: this.fingerprint.scrollbar?.height || 0,
            fontCount: this.fingerprint.fontList?.length || 0,
            cssGridSupported: this.fingerprint.cssGrid?.supported || false,
            cssVariablesSupported: this.fingerprint.cssVariables?.supported || false,
            prefersColorScheme: this.fingerprint.mediaQueries?.['(prefers-color-scheme: dark)'] || false,
            hoverSupported: this.fingerprint.mediaQueries?.['(hover: hover)'] || false,
            pointerFine: this.fingerprint.mediaQueries?.['(pointer: fine)'] || false,
            hash: this.getHash()
        };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CSSFingerprint;
}
/**
 * Advanced CSS Fingerprinting Library
 * Based on Oliver Brotchie's CSS-Fingerprint technique
 * https://github.com/OliverBrotchie/CSS-Fingerprint
 * 
 * This uses CSS import timing attacks to detect:
 * - Installed fonts
 * - Browser extensions
 * - System preferences
 * - Color schemes
 * - And much more...
 */

class AdvancedCSSFingerprint {
    constructor() {
        this.results = {};
        this.testCount = 0;
        this.completedTests = 0;
    }

    /**
     * Main fingerprinting function
     */
    async generate() {
        const results = await Promise.all([
            this.detectFonts(),
            this.detectColorScheme(),
            this.detectPrefersReducedMotion(),
            this.detectPrefersContrast(),
            this.detectForcedColors(),
            this.detectInvertedColors(),
            this.detectOrientation(),
            this.detectPointerType(),
            this.detectHoverCapability(),
            this.detectDisplayMode(),
            this.detectScreenResolution(),
            this.detectDevicePixelRatio(),
            this.detectColorGamut(),
            this.detectDynamicRange(),
            this.detectMonochrome(),
            this.detectGrid(),
            this.detectUpdate(),
            this.detectOverflowBlock(),
            this.detectOverflowInline(),
            this.detectScan(),
            this.detectScripting()
        ]);

        this.results = {
            fonts: results[0],
            colorScheme: results[1],
            prefersReducedMotion: results[2],
            prefersContrast: results[3],
            forcedColors: results[4],
            invertedColors: results[5],
            orientation: results[6],
            pointerType: results[7],
            hoverCapability: results[8],
            displayMode: results[9],
            screenResolution: results[10],
            devicePixelRatio: results[11],
            colorGamut: results[12],
            dynamicRange: results[13],
            monochrome: results[14],
            grid: results[15],
            update: results[16],
            overflowBlock: results[17],
            overflowInline: results[18],
            scan: results[19],
            scripting: results[20]
        };

        return this.results;
    }

    /**
     * CSS Import Timing Attack
     * Measures how long it takes to load a CSS file with specific media query
     */
    async testMediaQuery(query, testValue) {
        return new Promise((resolve) => {
            const startTime = performance.now();
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.media = `${query}: ${testValue}`;
            
            // Use a data URI to avoid network requests
            link.href = 'data:text/css,';
            
            link.onload = () => {
                const loadTime = performance.now() - startTime;
                document.head.removeChild(link);
                resolve({ value: testValue, matched: loadTime < 5 });
            };
            
            link.onerror = () => {
                document.head.removeChild(link);
                resolve({ value: testValue, matched: false });
            };
            
            document.head.appendChild(link);
            
            // Timeout after 100ms
            setTimeout(() => {
                if (link.parentNode) {
                    document.head.removeChild(link);
                    resolve({ value: testValue, matched: false });
                }
            }, 100);
        });
    }

    /**
     * Font detection using CSS @font-face and timing
     */
    async detectFonts() {
        const commonFonts = [
            // Windows fonts
            'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math',
            'Candara', 'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New',
            'Ebrima', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'HoloLens MDL2 Assets',
            'Impact', 'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode',
            'Malgun Gothic', 'Marlett', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue',
            'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft Yi Baiti',
            'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MV Boli', 'Myanmar Text', 'Nirmala UI',
            'Palatino Linotype', 'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Historic',
            'Segoe UI Emoji', 'Segoe UI Symbol', 'SimSun', 'Sitka', 'Sylfaen', 'Symbol', 'Tahoma',
            'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 'Yu Gothic',
            
            // macOS fonts
            'American Typewriter', 'Andale Mono', 'Apple Chancery', 'Apple Color Emoji', 'Apple SD Gothic Neo',
            'Arial Hebrew', 'Arial Rounded MT Bold', 'Avenir', 'Avenir Next', 'Avenir Next Condensed',
            'Baskerville', 'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps',
            'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter',
            'Cochin', 'Copperplate', 'Courier', 'Didot', 'DIN Alternate', 'DIN Condensed', 'Futura',
            'Geneva', 'Gill Sans', 'Helvetica', 'Helvetica Neue', 'Herculanum', 'Hoefler Text',
            'Lucida Grande', 'Luminari', 'Marker Felt', 'Menlo', 'Monaco', 'Noteworthy', 'Optima',
            'Palatino', 'Papyrus', 'Phosphate', 'Rockwell', 'Savoye LET', 'SignPainter', 'Skia',
            'Snell Roundhand', 'Tahoma', 'Times', 'Trattatello', 'Zapfino',
            
            // Linux fonts
            'Ubuntu', 'Ubuntu Condensed', 'Ubuntu Mono', 'DejaVu Sans', 'DejaVu Sans Mono', 'DejaVu Serif',
            'Droid Sans', 'Droid Sans Mono', 'Droid Serif', 'FreeMono', 'FreeSans', 'FreeSerif',
            'Liberation Mono', 'Liberation Sans', 'Liberation Serif', 'Noto Sans', 'Noto Serif',
            'Roboto', 'Roboto Condensed', 'Roboto Mono', 'Roboto Slab',
            
            // Web fonts
            'Open Sans', 'Lato', 'Montserrat', 'Source Sans Pro', 'Raleway', 'PT Sans', 'Oswald',
            'Merriweather', 'Playfair Display', 'Poppins', 'Inter', 'Nunito'
        ];

        const detectedFonts = [];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const testString = 'mmmmmmmmmmlli';
        const testSize = '72px';
        const baseFonts = ['monospace', 'sans-serif', 'serif'];

        // Get baseline measurements
        const baselines = {};
        baseFonts.forEach(baseFont => {
            ctx.font = `${testSize} ${baseFont}`;
            baselines[baseFont] = ctx.measureText(testString).width;
        });

        // Test each font
        for (const font of commonFonts) {
            let detected = false;
            for (const baseFont of baseFonts) {
                ctx.font = `${testSize} "${font}", ${baseFont}`;
                const width = ctx.measureText(testString).width;
                if (width !== baselines[baseFont]) {
                    detected = true;
                    break;
                }
            }
            if (detected) {
                detectedFonts.push(font);
            }
        }

        return detectedFonts;
    }

    /**
     * Detect color scheme preference
     */
    async detectColorScheme() {
        const schemes = ['light', 'dark', 'no-preference'];
        for (const scheme of schemes) {
            if (window.matchMedia(`(prefers-color-scheme: ${scheme})`).matches) {
                return scheme;
            }
        }
        return 'unknown';
    }

    /**
     * Detect prefers-reduced-motion
     */
    async detectPrefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Detect prefers-contrast
     */
    async detectPrefersContrast() {
        const levels = ['no-preference', 'more', 'less', 'custom'];
        for (const level of levels) {
            if (window.matchMedia(`(prefers-contrast: ${level})`).matches) {
                return level;
            }
        }
        return 'unknown';
    }

    /**
     * Detect forced-colors
     */
    async detectForcedColors() {
        return window.matchMedia('(forced-colors: active)').matches ? 'active' : 'none';
    }

    /**
     * Detect inverted-colors
     */
    async detectInvertedColors() {
        return window.matchMedia('(inverted-colors: inverted)').matches ? 'inverted' : 'none';
    }

    /**
     * Detect orientation
     */
    async detectOrientation() {
        return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
    }

    /**
     * Detect pointer type
     */
    async detectPointerType() {
        const types = ['none', 'coarse', 'fine'];
        for (const type of types) {
            if (window.matchMedia(`(pointer: ${type})`).matches) {
                return type;
            }
        }
        return 'unknown';
    }

    /**
     * Detect hover capability
     */
    async detectHoverCapability() {
        const capabilities = ['none', 'hover'];
        for (const cap of capabilities) {
            if (window.matchMedia(`(hover: ${cap})`).matches) {
                return cap;
            }
        }
        return 'unknown';
    }

    /**
     * Detect display mode
     */
    async detectDisplayMode() {
        const modes = ['fullscreen', 'standalone', 'minimal-ui', 'browser'];
        for (const mode of modes) {
            if (window.matchMedia(`(display-mode: ${mode})`).matches) {
                return mode;
            }
        }
        return 'unknown';
    }

    /**
     * Detect screen resolution
     */
    async detectScreenResolution() {
        return {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth
        };
    }

    /**
     * Detect device pixel ratio
     */
    async detectDevicePixelRatio() {
        return window.devicePixelRatio || 1;
    }

    /**
     * Detect color gamut
     */
    async detectColorGamut() {
        const gamuts = ['srgb', 'p3', 'rec2020'];
        for (const gamut of gamuts) {
            if (window.matchMedia(`(color-gamut: ${gamut})`).matches) {
                return gamut;
            }
        }
        return 'unknown';
    }

    /**
     * Detect dynamic range
     */
    async detectDynamicRange() {
        const ranges = ['standard', 'high'];
        for (const range of ranges) {
            if (window.matchMedia(`(dynamic-range: ${range})`).matches) {
                return range;
            }
        }
        return 'unknown';
    }

    /**
     * Detect monochrome
     */
    async detectMonochrome() {
        return window.matchMedia('(monochrome)').matches;
    }

    /**
     * Detect grid
     */
    async detectGrid() {
        return window.matchMedia('(grid)').matches;
    }

    /**
     * Detect update frequency
     */
    async detectUpdate() {
        const frequencies = ['none', 'slow', 'fast'];
        for (const freq of frequencies) {
            if (window.matchMedia(`(update: ${freq})`).matches) {
                return freq;
            }
        }
        return 'unknown';
    }

    /**
     * Detect overflow-block
     */
    async detectOverflowBlock() {
        const types = ['none', 'scroll', 'optional-paged', 'paged'];
        for (const type of types) {
            if (window.matchMedia(`(overflow-block: ${type})`).matches) {
                return type;
            }
        }
        return 'unknown';
    }

    /**
     * Detect overflow-inline
     */
    async detectOverflowInline() {
        const types = ['none', 'scroll'];
        for (const type of types) {
            if (window.matchMedia(`(overflow-inline: ${type})`).matches) {
                return type;
            }
        }
        return 'unknown';
    }

    /**
     * Detect scan type
     */
    async detectScan() {
        const types = ['interlace', 'progressive'];
        for (const type of types) {
            if (window.matchMedia(`(scan: ${type})`).matches) {
                return type;
            }
        }
        return 'unknown';
    }

    /**
     * Detect scripting support
     */
    async detectScripting() {
        const levels = ['none', 'initial-only', 'enabled'];
        for (const level of levels) {
            if (window.matchMedia(`(scripting: ${level})`).matches) {
                return level;
            }
        }
        return 'enabled'; // If we're running this, scripting is enabled
    }

    /**
     * Get deterministic hash
     */
    getHash() {
        const features = [
            `fonts:${this.results.fonts?.length || 0}`,
            `colorScheme:${this.results.colorScheme}`,
            `reducedMotion:${this.results.prefersReducedMotion}`,
            `contrast:${this.results.prefersContrast}`,
            `forcedColors:${this.results.forcedColors}`,
            `invertedColors:${this.results.invertedColors}`,
            `orientation:${this.results.orientation}`,
            `pointer:${this.results.pointerType}`,
            `hover:${this.results.hoverCapability}`,
            `displayMode:${this.results.displayMode}`,
            `resolution:${this.results.screenResolution?.width}x${this.results.screenResolution?.height}`,
            `dpr:${this.results.devicePixelRatio}`,
            `colorGamut:${this.results.colorGamut}`,
            `dynamicRange:${this.results.dynamicRange}`,
            `monochrome:${this.results.monochrome}`,
            `grid:${this.results.grid}`,
            `update:${this.results.update}`,
            // Include first 10 fonts for uniqueness
            ...((this.results.fonts || []).slice(0, 10).sort().map(f => `font:${f}`))
        ];

        const str = features.join('|');
        
        // DJB2 hash
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
            hash = hash >>> 0;
        }
        
        return hash.toString(16);
    }

    /**
     * Get compact fingerprint
     */
    getCompact() {
        return {
            fontCount: this.results.fonts?.length || 0,
            colorScheme: this.results.colorScheme,
            reducedMotion: this.results.prefersReducedMotion,
            pointer: this.results.pointerType,
            hover: this.results.hoverCapability,
            resolution: `${this.results.screenResolution?.width}x${this.results.screenResolution?.height}`,
            dpr: this.results.devicePixelRatio,
            hash: this.getHash()
        };
    }
}

// Combine both fingerprinting techniques
class CombinedCSSFingerprint {
    async generate() {
        const [basic, advanced] = await Promise.all([
            new CSSFingerprint().generate(),
            new AdvancedCSSFingerprint().generate()
        ]);

        return {
            basic: {
                data: basic,
                hash: new CSSFingerprint().getHash()
            },
            advanced: {
                data: advanced,
                hash: new AdvancedCSSFingerprint().getHash()
            },
            combined: this.getCombinedHash(basic, advanced)
        };
    }

    getCombinedHash(basic, advanced) {
        const basicFp = new CSSFingerprint();
        basicFp.fingerprint = basic;
        const basicHash = basicFp.getHash();

        const advancedFp = new AdvancedCSSFingerprint();
        advancedFp.results = advanced;
        const advancedHash = advancedFp.getHash();

        const combined = `${basicHash}|${advancedHash}`;
        
        // DJB2 hash
        let hash = 5381;
        for (let i = 0; i < combined.length; i++) {
            hash = ((hash << 5) + hash) + combined.charCodeAt(i);
            hash = hash >>> 0;
        }
        
        return hash.toString(16);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CSSFingerprint, AdvancedCSSFingerprint, CombinedCSSFingerprint };
}

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).FingerprintJS={})}(this,(function(t){"use strict";var e="5.0.1";function n(t,e){return new Promise((n=>setTimeout(n,t,e)))}function o(t){return!!t&&"function"==typeof t.then}function i(t,e){try{const n=t();o(n)?n.then((t=>e(!0,t)),(t=>e(!1,t))):e(!0,n)}catch(n){e(!1,n)}}async function r(t,e,n=16){const o=Array(t.length);let i=Date.now();for(let r=0;r<t.length;++r){o[r]=e(t[r],r);const a=Date.now();a>=i+n&&(i=a,await new Promise((t=>{const e=new MessageChannel;e.port1.onmessage=()=>t(),e.port2.postMessage(null)})))}return o}function a(t){return t.then(void 0,(()=>{})),t}function c(t){return parseInt(t)}function s(t){return parseFloat(t)}function u(t,e){return"number"==typeof t&&isNaN(t)?e:t}function l(t){return t.reduce(((t,e)=>t+(e?1:0)),0)}function d(t,e=1){if(Math.abs(e)>=1)return Math.round(t/e)*e;{const n=1/e;return Math.round(t*n)/n}}function m(t,e){const n=t[0]>>>16,o=65535&t[0],i=t[1]>>>16,r=65535&t[1],a=e[0]>>>16,c=65535&e[0],s=e[1]>>>16;let u=0,l=0,d=0,m=0;m+=r+(65535&e[1]),d+=m>>>16,m&=65535,d+=i+s,l+=d>>>16,d&=65535,l+=o+c,u+=l>>>16,l&=65535,u+=n+a,u&=65535,t[0]=u<<16|l,t[1]=d<<16|m}function f(t,e){const n=t[0]>>>16,o=65535&t[0],i=t[1]>>>16,r=65535&t[1],a=e[0]>>>16,c=65535&e[0],s=e[1]>>>16,u=65535&e[1];let l=0,d=0,m=0,f=0;f+=r*u,m+=f>>>16,f&=65535,m+=i*u,d+=m>>>16,m&=65535,m+=r*s,d+=m>>>16,m&=65535,d+=o*u,l+=d>>>16,d&=65535,d+=i*s,l+=d>>>16,d&=65535,d+=r*c,l+=d>>>16,d&=65535,l+=n*u+o*s+i*c+r*a,l&=65535,t[0]=l<<16|d,t[1]=m<<16|f}function p(t,e){const n=t[0];32===(e%=64)?(t[0]=t[1],t[1]=n):e<32?(t[0]=n<<e|t[1]>>>32-e,t[1]=t[1]<<e|n>>>32-e):(e-=32,t[0]=t[1]<<e|n>>>32-e,t[1]=n<<e|t[1]>>>32-e)}function h(t,e){0!==(e%=64)&&(e<32?(t[0]=t[1]>>>32-e,t[1]=t[1]<<e):(t[0]=t[1]<<e-32,t[1]=0))}function y(t,e){t[0]^=e[0],t[1]^=e[1]}const b=[4283543511,3981806797],v=[3301882366,444984403];function g(t){const e=[0,t[0]>>>1];y(t,e),f(t,b),e[1]=t[0]>>>1,y(t,e),f(t,v),e[1]=t[0]>>>1,y(t,e)}const w=[2277735313,289559509],L=[1291169091,658871167],k=[0,5],V=[0,1390208809],S=[0,944331445];function W(t,e){const n=function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++){const o=t.charCodeAt(n);if(o>127)return(new TextEncoder).encode(t);e[n]=o}return e}(t);e=e||0;const o=[0,n.length],i=o[1]%16,r=o[1]-i,a=[0,e],c=[0,e],s=[0,0],u=[0,0];let l;for(l=0;l<r;l+=16)s[0]=n[l+4]|n[l+5]<<8|n[l+6]<<16|n[l+7]<<24,s[1]=n[l]|n[l+1]<<8|n[l+2]<<16|n[l+3]<<24,u[0]=n[l+12]|n[l+13]<<8|n[l+14]<<16|n[l+15]<<24,u[1]=n[l+8]|n[l+9]<<8|n[l+10]<<16|n[l+11]<<24,f(s,w),p(s,31),f(s,L),y(a,s),p(a,27),m(a,c),f(a,k),m(a,V),f(u,L),p(u,33),f(u,w),y(c,u),p(c,31),m(c,a),f(c,k),m(c,S);s[0]=0,s[1]=0,u[0]=0,u[1]=0;const d=[0,0];switch(i){case 15:d[1]=n[l+14],h(d,48),y(u,d);case 14:d[1]=n[l+13],h(d,40),y(u,d);case 13:d[1]=n[l+12],h(d,32),y(u,d);case 12:d[1]=n[l+11],h(d,24),y(u,d);case 11:d[1]=n[l+10],h(d,16),y(u,d);case 10:d[1]=n[l+9],h(d,8),y(u,d);case 9:d[1]=n[l+8],y(u,d),f(u,L),p(u,33),f(u,w),y(c,u);case 8:d[1]=n[l+7],h(d,56),y(s,d);case 7:d[1]=n[l+6],h(d,48),y(s,d);case 6:d[1]=n[l+5],h(d,40),y(s,d);case 5:d[1]=n[l+4],h(d,32),y(s,d);case 4:d[1]=n[l+3],h(d,24),y(s,d);case 3:d[1]=n[l+2],h(d,16),y(s,d);case 2:d[1]=n[l+1],h(d,8),y(s,d);case 1:d[1]=n[l],y(s,d),f(s,w),p(s,31),f(s,L),y(a,s)}return y(a,o),y(c,o),m(a,c),m(c,a),g(a),g(c),m(a,c),m(c,a),("00000000"+(a[0]>>>0).toString(16)).slice(-8)+("00000000"+(a[1]>>>0).toString(16)).slice(-8)+("00000000"+(c[0]>>>0).toString(16)).slice(-8)+("00000000"+(c[1]>>>0).toString(16)).slice(-8)}function Z(t){return"function"!=typeof t}function x(t,e,n,o){const c=Object.keys(t).filter((t=>!function(t,e){for(let n=0,o=t.length;n<o;++n)if(t[n]===e)return!0;return!1}(n,t))),s=a(r(c,(n=>function(t,e){const n=a(new Promise((n=>{const o=Date.now();i(t.bind(null,e),((...t)=>{const e=Date.now()-o;if(!t[0])return n((()=>({error:t[1],duration:e})));const r=t[1];if(Z(r))return n((()=>({value:r,duration:e})));n((()=>new Promise((t=>{const n=Date.now();i(r,((...o)=>{const i=e+Date.now()-n;if(!o[0])return t({error:o[1],duration:i});t({value:o[1],duration:i})}))}))))}))})));return function(){return n.then((t=>t()))}}(t[n],e)),o));return async function(){const t=await s,e=await r(t,(t=>a(t())),o),n=await Promise.all(e),i={};for(let o=0;o<c.length;++o)i[c[o]]=n[o];return i}}function M(){const t=window,e=navigator;return l(["MSCSSMatrix"in t,"msSetImmediate"in t,"msIndexedDB"in t,"msMaxTouchPoints"in e,"msPointerEnabled"in e])>=4}function R(){const t=window,e=navigator;return l(["msWriteProfilerMark"in t,"MSStream"in t,"msLaunchUri"in e,"msSaveBlob"in e])>=3&&!M()}function F(){const t=window,e=navigator;return l(["webkitPersistentStorage"in e,"webkitTemporaryStorage"in e,0===(e.vendor||"").indexOf("Google"),"webkitResolveLocalFileSystemURL"in t,"BatteryManager"in t,"webkitMediaStream"in t,"webkitSpeechGrammar"in t])>=5}function G(){const t=window;return l(["ApplePayError"in t,"CSSPrimitiveValue"in t,"Counter"in t,0===navigator.vendor.indexOf("Apple"),"RGBColor"in t,"WebKitMediaKeys"in t])>=4}function I(){const t=window,{HTMLElement:e,Document:n}=t;return l(["safari"in t,!("ongestureend"in t),!("TouchEvent"in t),!("orientation"in t),e&&!("autocapitalize"in e.prototype),n&&"pointerLockElement"in n.prototype])>=4}function Y(){const t=window;return e=t.print,/^function\s.*?\{\s*\[native code]\s*}$/.test(String(e))&&"[object WebPageNamespace]"===String(t.browser);var e}function C(){var t,e;const n=window;return l(["buildID"in navigator,"MozAppearance"in(null!==(e=null===(t=document.documentElement)||void 0===t?void 0:t.style)&&void 0!==e?e:{}),"onmozfullscreenchange"in n,"mozInnerScreenX"in n,"CSSMozDocumentRule"in n,"CanvasCaptureMediaStream"in n])>=4}function j(){const t=window,e=navigator,{CSS:n,HTMLButtonElement:o}=t;return l([!("getStorageUpdates"in e),o&&"popover"in o.prototype,"CSSCounterStyleRule"in t,n.supports("font-size-adjust: ex-height 0.5"),n.supports("text-transform: full-width")])>=4}function X(){const t=document;return t.fullscreenElement||t.msFullscreenElement||t.mozFullScreenElement||t.webkitFullscreenElement||null}function P(){const t=F(),e=C(),n=window,o=navigator,i="connection";return t?l([!("SharedWorker"in n),o[i]&&"ontypechange"in o[i],!("sinkId"in new Audio)])>=2:!!e&&l(["onorientationchange"in n,"orientation"in n,/android/i.test(o.appVersion)])>=2}function E(){const t=navigator,e=window,n=Audio.prototype,{visualViewport:o}=e;return l(["srLatency"in n,"srChannelCount"in n,"devicePosture"in t,o&&"segments"in o,"getTextInformation"in Image.prototype])>=3}function H(){const t=window,e=t.OfflineAudioContext||t.webkitOfflineAudioContext;if(!e)return-2;if(G()&&!I()&&!function(){const t=window;return l(["DOMRectList"in t,"RTCPeerConnectionIceEvent"in t,"SVGGeometryElement"in t,"ontransitioncancel"in t])>=3}())return-1;const n=new e(1,5e3,44100),i=n.createOscillator();i.type="triangle",i.frequency.value=1e4;const r=n.createDynamicsCompressor();r.threshold.value=-50,r.knee.value=40,r.ratio.value=12,r.attack.value=0,r.release.value=.25,i.connect(r),r.connect(n.destination),i.start(0);const[c,s]=function(t){const e=3,n=500,i=500,r=5e3;let c=()=>{};const s=new Promise(((s,u)=>{let l=!1,d=0,m=0;t.oncomplete=t=>s(t.renderedBuffer);const f=()=>{setTimeout((()=>u(A("timeout"))),Math.min(i,m+r-Date.now()))},p=()=>{try{const i=t.startRendering();switch(o(i)&&a(i),t.state){case"running":m=Date.now(),l&&f();break;case"suspended":document.hidden||d++,l&&d>=e?u(A("suspended")):setTimeout(p,n)}}catch(i){u(i)}};p(),c=()=>{l||(l=!0,m>0&&f())}}));return[s,c]}(n),u=a(c.then((t=>function(t){let e=0;for(let n=0;n<t.length;++n)e+=Math.abs(t[n]);return e}(t.getChannelData(0).subarray(4500))),(t=>{if("timeout"===t.name||"suspended"===t.name)return-3;throw t})));return()=>(s(),u)}function A(t){const e=new Error(t);return e.name=t,e}async function N(t,e,o=50){var i,r,a;const c=document;for(;!c.body;)await n(o);const s=c.createElement("iframe");try{for((await new Promise(((t,n)=>{let o=!1;const i=()=>{o=!0,t()};s.onload=i,s.onerror=t=>{o=!0,n(t)};const{style:r}=s;r.setProperty("display","block","important"),r.position="absolute",r.top="0",r.left="0",r.visibility="hidden",e&&"srcdoc"in s?s.srcdoc=e:s.src="about:blank",c.body.appendChild(s);const a=()=>{var t,e;o||("complete"===(null===(e=null===(t=s.contentWindow)||void 0===t?void 0:t.document)||void 0===e?void 0:e.readyState)?i():setTimeout(a,10))};a()})));!(null===(r=null===(i=s.contentWindow)||void 0===i?void 0:i.document)||void 0===r?void 0:r.body);)await n(o);return await t(s,s.contentWindow)}finally{null===(a=s.parentNode)||void 0===a||a.removeChild(s)}}function J(t){const[e,n]=function(t){var e,n;const o=`Unexpected syntax '${t}'`,i=/^\s*([a-z-]*)(.*)$/i.exec(t),r=i[1]||void 0,a={},c=/([.:#][\w-]+|\[.+?\])/gi,s=(t,e)=>{a[t]=a[t]||[],a[t].push(e)};for(;;){const t=c.exec(i[2]);if(!t)break;const r=t[0];switch(r[0]){case".":s("class",r.slice(1));break;case"#":s("id",r.slice(1));break;case"[":{const t=/^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(r);if(!t)throw new Error(o);s(t[1],null!==(n=null!==(e=t[4])&&void 0!==e?e:t[5])&&void 0!==n?n:"");break}default:throw new Error(o)}}return[r,a]}(t),o=document.createElement(null!=e?e:"div");for(const i of Object.keys(n)){const t=n[i].join(" ");"style"===i?T(o.style,t):o.setAttribute(i,t)}return o}function T(t,e){for(const n of e.split(";")){const e=/^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(n);if(e){const[,n,o,,i]=e;t.setProperty(n,o,i||"")}}}const D=["monospace","sans-serif","serif"],_=["sans-serif-thin","ARNO PRO","Agency FB","Arabic Typesetting","Arial Unicode MS","AvantGarde Bk BT","BankGothic Md BT","Batang","Bitstream Vera Sans Mono","Calibri","Century","Century Gothic","Clarendon","EUROSTILE","Franklin Gothic","Futura Bk BT","Futura Md BT","GOTHAM","Gill Sans","HELV","Haettenschweiler","Helvetica Neue","Humanst521 BT","Leelawadee","Letter Gothic","Levenim MT","Lucida Bright","Lucida Sans","Menlo","MS Mincho","MS Outlook","MS Reference Specialty","MS UI Gothic","MT Extra","MYRIAD PRO","Marlett","Meiryo UI","Microsoft Uighur","Minion Pro","Monotype Corsiva","PMingLiU","Pristina","SCRIPTINA","Segoe UI Light","Serifa","SimHei","Small Fonts","Staccato222 BT","TRAJAN PRO","Univers CE 55 Medium","Vrinda","ZWAdobeF"];function z(t){let e,n,o=!1;const[i,r]=function(){const t=document.createElement("canvas");return t.width=1,t.height=1,[t,t.getContext("2d")]}();return!function(t,e){return!(!e||!t.toDataURL)}(i,r)?e=n="unsupported":(o=function(t){return t.rect(0,0,10,10),t.rect(2,2,6,6),!t.isPointInPath(5,5,"evenodd")}(r),t?e=n="skipped":[e,n]=function(t,e){!function(t,e){t.width=240,t.height=60,e.textBaseline="alphabetic",e.fillStyle="#f60",e.fillRect(100,1,62,20),e.fillStyle="#069",e.font='11pt "Times New Roman"';const n=`Cwm fjordbank gly ${String.fromCharCode(55357,56835)}`;e.fillText(n,2,15),e.fillStyle="rgba(102, 204, 0, 0.2)",e.font="18pt Arial",e.fillText(n,4,45)}(t,e);const n=B(t),o=B(t);if(n!==o)return["unstable","unstable"];!function(t,e){t.width=122,t.height=110,e.globalCompositeOperation="multiply";for(const[n,o,i]of[["#f2f",40,40],["#2ff",80,40],["#ff2",60,80]])e.fillStyle=n,e.beginPath(),e.arc(o,i,40,0,2*Math.PI,!0),e.closePath(),e.fill();e.fillStyle="#f9c",e.arc(60,60,60,0,2*Math.PI,!0),e.arc(60,60,20,0,2*Math.PI,!0),e.fill("evenodd")}(t,e);const i=B(t);return[i,n]}(i,r)),{winding:o,geometry:e,text:n}}function B(t){return t.toDataURL()}function O(){const t=screen,e=t=>u(c(t),null),n=[e(t.width),e(t.height)];return n.sort().reverse(),n}const $=2500;let U,Q;function K(){return function(){if(void 0!==Q)return;const t=()=>{const e=q();tt(e)?Q=setTimeout(t,$):(U=e,Q=void 0)};t()}(),async()=>{let t=q();if(tt(t)){if(U)return[...U];X()&&(await function(){const t=document;return(t.exitFullscreen||t.msExitFullscreen||t.mozCancelFullScreen||t.webkitExitFullscreen).call(t)}(),t=q())}return tt(t)||(U=t),t}}function q(){const t=screen;return[u(s(t.availTop),null),u(s(t.width)-s(t.availWidth)-u(s(t.availLeft),0),null),u(s(t.height)-s(t.availHeight)-u(s(t.availTop),0),null),u(s(t.availLeft),null)]}function tt(t){for(let e=0;e<4;++e)if(t[e])return!1;return!0}function et(t){t.style.setProperty("visibility","hidden","important"),t.style.setProperty("display","block","important")}function nt(t){return matchMedia(`(inverted-colors: ${t})`).matches}function ot(t){return matchMedia(`(forced-colors: ${t})`).matches}function it(t){return matchMedia(`(prefers-contrast: ${t})`).matches}function rt(t){return matchMedia(`(prefers-reduced-motion: ${t})`).matches}function at(t){return matchMedia(`(prefers-reduced-transparency: ${t})`).matches}function ct(t){return matchMedia(`(dynamic-range: ${t})`).matches}const st=Math,ut=()=>0;const lt="mmMwWLliI0fiflO&1",dt={default:[],apple:[{font:"-apple-system-body"}],serif:[{fontFamily:"serif"}],sans:[{fontFamily:"sans-serif"}],mono:[{fontFamily:"monospace"}],min:[{fontSize:"1px"}],system:[{fontFamily:"system-ui"}]};const mt=function(){let t=window;for(;;){const n=t.parent;if(!n||n===t)return!1;try{if(n.location.origin!==t.location.origin)return!0}catch(e){if(e instanceof Error&&"SecurityError"===e.name)return!0;throw e}t=n}};const ft=new Set([10752,2849,2884,2885,2886,2928,2929,2930,2931,2932,2960,2961,2962,2963,2964,2965,2966,2967,2968,2978,3024,3042,3088,3089,3106,3107,32773,32777,32777,32823,32824,32936,32937,32938,32939,32968,32969,32970,32971,3317,33170,3333,3379,3386,33901,33902,34016,34024,34076,3408,3410,3411,3412,3413,3414,3415,34467,34816,34817,34818,34819,34877,34921,34930,35660,35661,35724,35738,35739,36003,36004,36005,36347,36348,36349,37440,37441,37443,7936,7937,7938]),pt=new Set([34047,35723,36063,34852,34853,34854,34229,36392,36795,38449]),ht=["FRAGMENT_SHADER","VERTEX_SHADER"],yt=["LOW_FLOAT","MEDIUM_FLOAT","HIGH_FLOAT","LOW_INT","MEDIUM_INT","HIGH_INT"],bt="WEBGL_debug_renderer_info";function vt(t){if(t.webgl)return t.webgl.context;const e=document.createElement("canvas");let n;e.addEventListener("webglCreateContextError",(()=>n=void 0));for(const i of["webgl","experimental-webgl"]){try{n=e.getContext(i)}catch(o){}if(n)break}return t.webgl={context:n},n}function gt(t,e,n){const o=t.getShaderPrecisionFormat(t[e],t[n]);return o?[o.rangeMin,o.rangeMax,o.precision]:[]}function wt(t){return Object.keys(t.__proto__).filter(Lt)}function Lt(t){return"string"==typeof t&&!t.match(/[^A-Z0-9_x]/)}function kt(){return C()}function Vt(t){return"function"==typeof t.getParameter}const St={fonts:function(){return N((async(t,{document:e})=>{const n=e.body;n.style.fontSize="48px";const o=e.createElement("div");o.style.setProperty("visibility","hidden","important");const i={},r={},a=t=>{const n=e.createElement("span"),{style:i}=n;return i.position="absolute",i.top="0",i.left="0",i.fontFamily=t,n.textContent="mmMwWLliI0O&1",o.appendChild(n),n},c=(t,e)=>a(`'${t}',${e}`),s=D.map(a),u=(()=>{const t={};for(const e of _)t[e]=D.map((t=>c(e,t)));return t})();n.appendChild(o);for(let l=0;l<D.length;l++)i[D[l]]=s[l].offsetWidth,r[D[l]]=s[l].offsetHeight;return _.filter((t=>{return e=u[t],D.some(((t,n)=>e[n].offsetWidth!==i[t]||e[n].offsetHeight!==r[t]));var e}))}))},domBlockers:async function({debug:t}={}){if(!G()&&!P())return;const e=function(){const t=atob;return{abpIndo:["#Iklan-Melayang","#Kolom-Iklan-728","#SidebarIklan-wrapper",'[title="ALIENBOLA" i]',t("I0JveC1CYW5uZXItYWRz")],abpvn:[".quangcao","#mobileCatfish",t("LmNsb3NlLWFkcw=="),'[id^="bn_bottom_fixed_"]',"#pmadv"],adBlockFinland:[".mainostila",t("LnNwb25zb3JpdA=="),".ylamainos",t("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"),t("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")],adBlockPersian:["#navbar_notice_50",".kadr",'TABLE[width="140px"]',"#divAgahi",t("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd")],adBlockWarningRemoval:["#adblock-honeypot",".adblocker-root",".wp_adblock_detect",t("LmhlYWRlci1ibG9ja2VkLWFk"),t("I2FkX2Jsb2NrZXI=")],adGuardAnnoyances:[".hs-sosyal","#cookieconsentdiv",'div[class^="app_gdpr"]',".as-oil",'[data-cypress="soft-push-notification-modal"]'],adGuardBase:[".BetterJsPopOverlay",t("I2FkXzMwMFgyNTA="),t("I2Jhbm5lcmZsb2F0MjI="),t("I2NhbXBhaWduLWJhbm5lcg=="),t("I0FkLUNvbnRlbnQ=")],adGuardChinese:[t("LlppX2FkX2FfSA=="),t("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"),"#widget-quan",t("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"),t("YVtocmVmKj0iLjE5NTZobC5jb20vIl0=")],adGuardFrench:["#pavePub",t("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"),".mobile_adhesion",".widgetadv",t("LmFkc19iYW4=")],adGuardGerman:['aside[data-portal-id="leaderboard"]'],adGuardJapanese:["#kauli_yad_1",t("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="),t("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="),t("LmFkZ29vZ2xl"),t("Ll9faXNib29zdFJldHVybkFk")],adGuardMobile:[t("YW1wLWF1dG8tYWRz"),t("LmFtcF9hZA=="),'amp-embed[type="24smi"]',"#mgid_iframe1",t("I2FkX2ludmlld19hcmVh")],adGuardRussian:[t("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="),t("LnJlY2xhbWE="),'div[id^="smi2adblock"]',t("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"),"#psyduckpockeball"],adGuardSocial:[t("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="),t("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="),".etsy-tweet","#inlineShare",".popup-social"],adGuardSpanishPortuguese:["#barraPublicidade","#Publicidade","#publiEspecial","#queTooltip",".cnt-publi"],adGuardTrackingProtection:["#qoo-counter",t("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="),t("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="),t("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="),"#top100counter"],adGuardTurkish:["#backkapat",t("I3Jla2xhbWk="),t("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="),t("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"),t("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")],bulgarian:[t("dGQjZnJlZW5ldF90YWJsZV9hZHM="),"#ea_intext_div",".lapni-pop-over","#xenium_hot_offers"],easyList:[".yb-floorad",t("LndpZGdldF9wb19hZHNfd2lkZ2V0"),t("LnRyYWZmaWNqdW5reS1hZA=="),".textad_headline",t("LnNwb25zb3JlZC10ZXh0LWxpbmtz")],easyListChina:[t("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="),t("LmZyb250cGFnZUFkdk0="),"#taotaole","#aafoot.top_box",".cfa_popup"],easyListCookie:[".ezmob-footer",".cc-CookieWarning","[data-cookie-number]",t("LmF3LWNvb2tpZS1iYW5uZXI="),".sygnal24-gdpr-modal-wrap"],easyListCzechSlovak:["#onlajny-stickers",t("I3Jla2xhbW5pLWJveA=="),t("LnJla2xhbWEtbWVnYWJvYXJk"),".sklik",t("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")],easyListDutch:[t("I2FkdmVydGVudGll"),t("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="),".adstekst",t("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="),"#semilo-lrectangle"],easyListGermany:["#SSpotIMPopSlider",t("LnNwb25zb3JsaW5rZ3J1ZW4="),t("I3dlcmJ1bmdza3k="),t("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"),t("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=")],easyListItaly:[t("LmJveF9hZHZfYW5udW5jaQ=="),".sb-box-pubbliredazionale",t("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"),t("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"),t("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")],easyListLithuania:[t("LnJla2xhbW9zX3RhcnBhcw=="),t("LnJla2xhbW9zX251b3JvZG9z"),t("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"),t("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"),t("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")],estonian:[t("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],fanboyAnnoyances:["#ac-lre-player",".navigate-to-top","#subscribe_popup",".newsletter_holder","#back-top"],fanboyAntiFacebook:[".util-bar-module-firefly-visible"],fanboyEnhancedTrackers:[".open.pushModal","#issuem-leaky-paywall-articles-zero-remaining-nag","#sovrn_container",'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',".BlockNag__Card"],fanboySocial:["#FollowUs","#meteored_share","#social_follow",".article-sharer",".community__social-desc"],frellwitSwedish:[t("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="),t("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="),"article.category-samarbete",t("ZGl2LmhvbGlkQWRz"),"ul.adsmodern"],greekAdBlock:[t("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"),t("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="),t("QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"),"DIV.agores300","TABLE.advright"],hungarian:["#cemp_doboz",".optimonk-iframe-container",t("LmFkX19tYWlu"),t("W2NsYXNzKj0iR29vZ2xlQWRzIl0="),"#hirdetesek_box"],iDontCareAboutCookies:['.alert-info[data-block-track*="CookieNotice"]',".ModuleTemplateCookieIndicator",".o--cookies--container","#cookies-policy-sticky","#stickyCookieBar"],icelandicAbp:[t("QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==")],latvian:[t("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="),t("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==")],listKr:[t("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="),t("I2xpdmVyZUFkV3JhcHBlcg=="),t("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="),t("aW5zLmZhc3R2aWV3LWFk"),".revenue_unit_item.dable"],listeAr:[t("LmdlbWluaUxCMUFk"),".right-and-left-sponsers",t("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="),t("YVtocmVmKj0iYm9vcmFxLm9yZyJd"),t("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")],listeFr:[t("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="),t("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="),t("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="),".site-pub-interstitiel",'div[id^="crt-"][data-criteo-id]'],officialPolish:["#ceneo-placeholder-ceneo-12",t("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"),t("YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="),t("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="),t("ZGl2I3NrYXBpZWNfYWQ=")],ro:[t("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"),t("YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"),t("YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="),t("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"),'a[href^="/url/"]'],ruAd:[t("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"),t("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="),t("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="),"#pgeldiz",".yandex-rtb-block"],thaiAds:["a[href*=macau-uta-popup]",t("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="),t("LmFkczMwMHM="),".bumq",".img-kosana"],webAnnoyancesUltralist:["#mod-social-share-2","#social-tools",t("LmN0cGwtZnVsbGJhbm5lcg=="),".zergnet-recommend",".yt.btn-link.btn-md.btn"]}}(),o=Object.keys(e),i=[].concat(...o.map((t=>e[t]))),r=await async function(t){var e;const o=document,i=o.createElement("div"),r=new Array(t.length),a={};et(i);for(let n=0;n<t.length;++n){const e=J(t[n]);"DIALOG"===e.tagName&&e.show();const a=o.createElement("div");et(a),a.appendChild(e),i.appendChild(a),r[n]=e}for(;!o.body;)await n(50);o.body.appendChild(i);try{for(let e=0;e<t.length;++e)r[e].offsetParent||(a[t[e]]=!0)}finally{null===(e=i.parentNode)||void 0===e||e.removeChild(i)}return a}(i);t&&function(t,e){let n="DOM blockers debug:\n```";for(const o of Object.keys(t)){n+=`\n${o}:`;for(const i of t[o])n+=`\n  ${e[i]?"🚫":"➡️"} ${i}`}console.log(`${n}\n\`\`\``)}(e,r);const a=o.filter((t=>{const n=e[t];return l(n.map((t=>r[t])))>.6*n.length}));return a.sort(),a},fontPreferences:function(){return function(t,e=4e3){return N(((n,o)=>{const i=o.document,r=i.body,a=r.style;a.width=`${e}px`,a.webkitTextSizeAdjust=a.textSizeAdjust="none",F()?r.style.zoom=""+1/o.devicePixelRatio:G()&&(r.style.zoom="reset");const c=i.createElement("div");return c.textContent=[...Array(e/20|0)].map((()=>"word")).join(" "),r.appendChild(c),t(i,r)}),'<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')}(((t,e)=>{const n={},o={};for(const i of Object.keys(dt)){const[o={},r=lt]=dt[i],a=t.createElement("span");a.textContent=r,a.style.whiteSpace="nowrap";for(const t of Object.keys(o)){const e=o[t];void 0!==e&&(a.style[t]=e)}n[i]=a,e.append(t.createElement("br"),a)}for(const i of Object.keys(dt))o[i]=n[i].getBoundingClientRect().width;return o}))},audio:function(){return G()&&j()&&Y()||F()&&E()&&function(){const t=window,{URLPattern:e}=t;return l(["union"in Set.prototype,"Iterator"in t,e&&"hasRegExpGroups"in e.prototype,"RGB8"in WebGLRenderingContext.prototype])>=3}()?-4:H()},screenFrame:function(){if(G()&&j()&&Y())return()=>Promise.resolve(void 0);const t=K();return async()=>{const e=await t(),n=t=>null===t?null:d(t,10);return[n(e[0]),n(e[1]),n(e[2]),n(e[3])]}},canvas:function(){return z(G()&&j()&&Y())},osCpu:function(){return navigator.oscpu},languages:function(){const t=navigator,e=[],n=t.language||t.userLanguage||t.browserLanguage||t.systemLanguage;if(void 0!==n&&e.push([n]),Array.isArray(t.languages))F()&&function(){const t=window;return l([!("MediaSettingsRange"in t),"RTCEncodedAudioFrame"in t,""+t.Intl=="[object Intl]",""+t.Reflect=="[object Reflect]"])>=3}()||e.push(t.languages);else if("string"==typeof t.languages){const n=t.languages;n&&e.push(n.split(","))}return e},colorDepth:function(){return window.screen.colorDepth},deviceMemory:function(){return u(s(navigator.deviceMemory),void 0)},screenResolution:function(){if(!(G()&&j()&&Y()))return O()},hardwareConcurrency:function(){return u(c(navigator.hardwareConcurrency),void 0)},timezone:function(){var t;const e=null===(t=window.Intl)||void 0===t?void 0:t.DateTimeFormat;if(e){const t=(new e).resolvedOptions().timeZone;if(t)return t}const n=-function(){const t=(new Date).getFullYear();return Math.max(s(new Date(t,0,1).getTimezoneOffset()),s(new Date(t,6,1).getTimezoneOffset()))}();return`UTC${n>=0?"+":""}${n}`},sessionStorage:function(){try{return!!window.sessionStorage}catch(t){return!0}},localStorage:function(){try{return!!window.localStorage}catch(t){return!0}},indexedDB:function(){if(!M()&&!R())try{return!!window.indexedDB}catch(t){return!0}},openDatabase:function(){return!!window.openDatabase},cpuClass:function(){return navigator.cpuClass},platform:function(){const{platform:t}=navigator;return"MacIntel"===t&&G()&&!I()?function(){if("iPad"===navigator.platform)return!0;const t=screen,e=t.width/t.height;return l(["MediaSource"in window,!!Element.prototype.webkitRequestFullscreen,e>.65&&e<1.53])>=2}()?"iPad":"iPhone":t},plugins:function(){const t=navigator.plugins;if(!t)return;const e=[];for(let n=0;n<t.length;++n){const o=t[n];if(!o)continue;const i=[];for(let t=0;t<o.length;++t){const e=o[t];i.push({type:e.type,suffixes:e.suffixes})}e.push({name:o.name,description:o.description,mimeTypes:i})}return e},touchSupport:function(){const t=navigator;let e,n=0;void 0!==t.maxTouchPoints?n=c(t.maxTouchPoints):void 0!==t.msMaxTouchPoints&&(n=t.msMaxTouchPoints);try{document.createEvent("TouchEvent"),e=!0}catch(o){e=!1}return{maxTouchPoints:n,touchEvent:e,touchStart:"ontouchstart"in window}},vendor:function(){return navigator.vendor||""},vendorFlavors:function(){const t=[];for(const e of["chrome","safari","__crWeb","__gCrWeb","yandex","__yb","__ybro","__firefox__","__edgeTrackingPreventionStatistics","webkit","oprt","samsungAr","ucweb","UCShellJava","puffinDevice"]){const n=window[e];n&&"object"==typeof n&&t.push(e)}return t.sort()},cookiesEnabled:function(){const t=document;try{t.cookie="cookietest=1; SameSite=Strict;";const e=-1!==t.cookie.indexOf("cookietest=");return t.cookie="cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT",e}catch(e){return!1}},colorGamut:function(){for(const t of["rec2020","p3","srgb"])if(matchMedia(`(color-gamut: ${t})`).matches)return t},invertedColors:function(){return!!nt("inverted")||!nt("none")&&void 0},forcedColors:function(){return!!ot("active")||!ot("none")&&void 0},monochrome:function(){if(matchMedia("(min-monochrome: 0)").matches){for(let t=0;t<=100;++t)if(matchMedia(`(max-monochrome: ${t})`).matches)return t;throw new Error("Too high value")}},contrast:function(){return it("no-preference")?0:it("high")||it("more")?1:it("low")||it("less")?-1:it("forced")?10:void 0},reducedMotion:function(){return!!rt("reduce")||!rt("no-preference")&&void 0},reducedTransparency:function(){return!!at("reduce")||!at("no-preference")&&void 0},hdr:function(){return!!ct("high")||!ct("standard")&&void 0},math:function(){const t=st.acos||ut,e=st.acosh||ut,n=st.asin||ut,o=st.asinh||ut,i=st.atanh||ut,r=st.atan||ut,a=st.sin||ut,c=st.sinh||ut,s=st.cos||ut,u=st.cosh||ut,l=st.tan||ut,d=st.tanh||ut,m=st.exp||ut,f=st.expm1||ut,p=st.log1p||ut;return{acos:t(.12312423423423424),acosh:e(1e308),acoshPf:(h=1e154,st.log(h+st.sqrt(h*h-1))),asin:n(.12312423423423424),asinh:o(1),asinhPf:(t=>st.log(t+st.sqrt(t*t+1)))(1),atanh:i(.5),atanhPf:(t=>st.log((1+t)/(1-t))/2)(.5),atan:r(.5),sin:a(-1e300),sinh:c(1),sinhPf:(t=>st.exp(t)-1/st.exp(t)/2)(1),cos:s(10.000000000123),cosh:u(1),coshPf:(t=>(st.exp(t)+1/st.exp(t))/2)(1),tan:l(-1e300),tanh:d(1),tanhPf:(t=>(st.exp(2*t)-1)/(st.exp(2*t)+1))(1),exp:m(1),expm1:f(1),expm1Pf:(t=>st.exp(t)-1)(1),log1p:p(10),log1pPf:(t=>st.log(1+t))(10),powPI:(t=>st.pow(st.PI,t))(-100)};var h},pdfViewerEnabled:function(){return navigator.pdfViewerEnabled},architecture:function(){const t=new Float32Array(1),e=new Uint8Array(t.buffer);return t[0]=1/0,t[0]=t[0]-t[0],e[3]},applePay:function(){const{ApplePaySession:t}=window;if("function"!=typeof(null==t?void 0:t.canMakePayments))return-1;if(mt())return-3;try{return t.canMakePayments()?1:0}catch(e){return function(t){if(t instanceof Error&&"InvalidAccessError"===t.name&&/\bfrom\b.*\binsecure\b/i.test(t.message))return-2;throw t}(e)}},privateClickMeasurement:function(){var t;const e=document.createElement("a"),n=null!==(t=e.attributionSourceId)&&void 0!==t?t:e.attributionsourceid;return void 0===n?void 0:String(n)},audioBaseLatency:function(){if(!(P()||G()))return-2;if(!window.AudioContext)return-1;const t=(new AudioContext).baseLatency;return null==t?-1:isFinite(t)?t:-3},dateTimeLocale:function(){if(!window.Intl)return-1;const t=window.Intl.DateTimeFormat;if(!t)return-2;const e=t().resolvedOptions().locale;return e||""===e?e:-3},webGlBasics:function({cache:t}){var e,n,o,i,r,a;const c=vt(t);if(!c)return-1;if(!Vt(c))return-2;const s=kt()?null:c.getExtension(bt);return{version:(null===(e=c.getParameter(c.VERSION))||void 0===e?void 0:e.toString())||"",vendor:(null===(n=c.getParameter(c.VENDOR))||void 0===n?void 0:n.toString())||"",vendorUnmasked:s?null===(o=c.getParameter(s.UNMASKED_VENDOR_WEBGL))||void 0===o?void 0:o.toString():"",renderer:(null===(i=c.getParameter(c.RENDERER))||void 0===i?void 0:i.toString())||"",rendererUnmasked:s?null===(r=c.getParameter(s.UNMASKED_RENDERER_WEBGL))||void 0===r?void 0:r.toString():"",shadingLanguageVersion:(null===(a=c.getParameter(c.SHADING_LANGUAGE_VERSION))||void 0===a?void 0:a.toString())||""}},webGlExtensions:function({cache:t}){const e=vt(t);if(!e)return-1;if(!Vt(e))return-2;const n=e.getSupportedExtensions(),o=e.getContextAttributes(),i=[],r=[],a=[],c=[],s=[];if(o)for(const l of Object.keys(o))r.push(`${l}=${o[l]}`);const u=wt(e);for(const l of u){const t=e[l];a.push(`${l}=${t}${ft.has(t)?`=${e.getParameter(t)}`:""}`)}if(n)for(const l of n){if(l===bt&&kt()||"WEBGL_polygon_mode"===l&&(F()||G()))continue;const t=e.getExtension(l);if(t)for(const n of wt(t)){const o=t[n];c.push(`${n}=${o}${pt.has(o)?`=${e.getParameter(o)}`:""}`)}else i.push(l)}for(const l of ht)for(const t of yt){const n=gt(e,l,t);s.push(`${l}.${t}=${n.join(",")}`)}return c.sort(),a.sort(),{contextAttributes:r,parameters:a,shaderPrecisions:s,extensions:n,extensionParameters:c,unsupportedExtensions:i}}};const Wt="$ if upgrade to Pro: https://fpjs.dev/pro";function Zt(t){const e=function(t){if(P())return.4;if(G())return!I()||j()&&Y()?.3:.5;const e="value"in t.platform?t.platform.value:"";if(/^Win/.test(e))return.6;if(/^Mac/.test(e))return.5;return.7}(t),n=function(t){return d(.99+.01*t,1e-4)}(e);return{score:e,comment:Wt.replace(/\$/g,`${n}`)}}function xt(t){return JSON.stringify(t,((t,e)=>{return e instanceof Error?{name:(n=e).name,message:n.message,stack:null===(o=n.stack)||void 0===o?void 0:o.split("\n"),...n}:e;var n,o}),2)}function Mt(t){return W(function(t){let e="";for(const n of Object.keys(t).sort()){const o=t[n],i="error"in o?"error":JSON.stringify(o.value);e+=`${e?"|":""}${n.replace(/([:|\\])/g,"\\$1")}:${i}`}return e}(t))}function Rt(t=50){return function(t,e=1/0){const{requestIdleCallback:o}=window;return o?new Promise((t=>o.call(window,(()=>t()),{timeout:e}))):n(Math.min(t,e))}(t,2*t)}function Ft(t,n){const o=Date.now();return{async get(i){const r=Date.now(),a=await t(),c=function(t){let n;const o=Zt(t);return{get visitorId(){return void 0===n&&(n=Mt(this.components)),n},set visitorId(t){n=t},confidence:o,components:t,version:e}}(a);return(n||(null==i?void 0:i.debug))&&console.log(`Copy the text below to get the debug data:\n\n\`\`\`\nversion: ${c.version}\nuserAgent: ${navigator.userAgent}\ntimeBetweenLoadAndGet: ${r-o}\nvisitorId: ${c.visitorId}\ncomponents: ${xt(a)}\n\`\`\``),c}}}async function Gt(t={}){var n;(null===(n=t.monitoring)||void 0===n||n)&&function(){if(!(window.__fpjs_d_m||Math.random()>=.001))try{const t=new XMLHttpRequest;t.open("get",`https://m1.openfpcdn.io/fingerprintjs/v${e}/npm-monitoring`,!0),t.send()}catch(t){console.error(t)}}();const{delayFallback:o,debug:i}=t;await Rt(o);const r=function(t){return x(St,t,[])}({cache:{},debug:i});return Ft(r,i)}var It={load:Gt,hashComponents:Mt,componentsToDebugString:xt};const Yt=W;t.componentsToDebugString=xt,t.default=It,t.getFullscreenElement=X,t.getUnstableAudioFingerprint=H,t.getUnstableCanvasFingerprint=z,t.getUnstableScreenFrame=K,t.getUnstableScreenResolution=O,t.getWebGLContext=vt,t.hashComponents=Mt,t.isAndroid=P,t.isChromium=F,t.isDesktopWebKit=I,t.isEdgeHTML=R,t.isGecko=C,t.isSamsungInternet=E,t.isTrident=M,t.isWebKit=G,t.load=Gt,t.loadSources=x,t.murmurX64Hash128=Yt,t.prepareForSources=Rt,t.sources=St,t.transformSource=function(t,e){const n=t=>Z(t)?e(t):()=>{const n=t();return o(n)?n.then(e):e(n)};return e=>{const i=t(e);return o(i)?i.then(n):n(i)}},t.withIframe=N,Object.defineProperty(t,"__esModule",{value:!0})}));

!function(t,e){"object"==typeof exports?module.exports=exports=e():"function"==typeof define&&define.amd?define([],e):t.CryptoJS=e()}(this,function(){var W,O,I,U,K,X,L,l,j,T,t,N,q,e,Z,V,G,J,Q,Y,$,t1,e1,r1,i1,o1,n1,s,s1,c1,a1,h1,l1,o,f1,r,d1,u1,n,c,a,h,f,d,i=function(h){var i;if("undefined"!=typeof window&&window.crypto&&(i=window.crypto),"undefined"!=typeof self&&self.crypto&&(i=self.crypto),!(i=!(i=!(i="undefined"!=typeof globalThis&&globalThis.crypto?globalThis.crypto:i)&&"undefined"!=typeof window&&window.msCrypto?window.msCrypto:i)&&"undefined"!=typeof global&&global.crypto?global.crypto:i)&&"function"==typeof require)try{i=require("crypto")}catch(t){}var r=Object.create||function(t){return e.prototype=t,t=new e,e.prototype=null,t};function e(){}var t={},o=t.lib={},n=o.Base={extend:function(t){var e=r(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),(e.init.prototype=e).$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},l=o.WordArray=n.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||c).stringify(this)},concat:function(t){var e=this.words,r=t.words,i=this.sigBytes,o=t.sigBytes;if(this.clamp(),i%4)for(var n=0;n<o;n++){var s=r[n>>>2]>>>24-n%4*8&255;e[i+n>>>2]|=s<<24-(i+n)%4*8}else for(var c=0;c<o;c+=4)e[i+c>>>2]=r[c>>>2];return this.sigBytes+=o,this},clamp:function(){var t=this.words,e=this.sigBytes;t[e>>>2]&=4294967295<<32-e%4*8,t.length=h.ceil(e/4)},clone:function(){var t=n.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],r=0;r<t;r+=4)e.push(function(){if(i){if("function"==typeof i.getRandomValues)try{return i.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof i.randomBytes)try{return i.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")}());return new l.init(e,t)}}),s=t.enc={},c=s.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],o=0;o<r;o++){var n=e[o>>>2]>>>24-o%4*8&255;i.push((n>>>4).toString(16)),i.push((15&n).toString(16))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i+=2)r[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new l.init(r,e/2)}},a=s.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],o=0;o<r;o++){var n=e[o>>>2]>>>24-o%4*8&255;i.push(String.fromCharCode(n))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new l.init(r,e)}},f=s.Utf8={stringify:function(t){try{return decodeURIComponent(escape(a.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return a.parse(unescape(encodeURIComponent(t)))}},d=o.BufferedBlockAlgorithm=n.extend({reset:function(){this._data=new l.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=f.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(t){var e,r=this._data,i=r.words,o=r.sigBytes,n=this.blockSize,s=o/(4*n),c=(s=t?h.ceil(s):h.max((0|s)-this._minBufferSize,0))*n,t=h.min(4*c,o);if(c){for(var a=0;a<c;a+=n)this._doProcessBlock(i,a);e=i.splice(0,c),r.sigBytes-=t}return new l.init(e,t)},clone:function(){var t=n.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),u=(o.Hasher=d.extend({cfg:n.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){d.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(r){return function(t,e){return new r.init(e).finalize(t)}},_createHmacHelper:function(r){return function(t,e){return new u.HMAC.init(r,e).finalize(t)}}}),t.algo={});return t}(Math),u=(u=(p=i).lib,W=u.Base,O=u.WordArray,(u=p.x64={}).Word=W.extend({init:function(t,e){this.high=t,this.low=e}}),u.WordArray=W.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:8*t.length},toX32:function(){for(var t=this.words,e=t.length,r=[],i=0;i<e;i++){var o=t[i];r.push(o.high),r.push(o.low)}return O.create(r,this.sigBytes)},clone:function(){for(var t=W.clone.call(this),e=t.words=this.words.slice(0),r=e.length,i=0;i<r;i++)e[i]=e[i].clone();return t}}),"function"==typeof ArrayBuffer&&(p=i.lib.WordArray,I=p.init,(p.init=function(t){if((t=(t=t instanceof ArrayBuffer?new Uint8Array(t):t)instanceof Int8Array||"undefined"!=typeof Uint8ClampedArray&&t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array?new Uint8Array(t.buffer,t.byteOffset,t.byteLength):t)instanceof Uint8Array){for(var e=t.byteLength,r=[],i=0;i<e;i++)r[i>>>2]|=t[i]<<24-i%4*8;I.call(this,r,e)}else I.apply(this,arguments)}).prototype=p),i),p1=u.lib.WordArray;function _1(t){return t<<8&4278255360|t>>>8&16711935}(u=u.enc).Utf16=u.Utf16BE={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],o=0;o<r;o+=2){var n=e[o>>>2]>>>16-o%4*8&65535;i.push(String.fromCharCode(n))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>1]|=t.charCodeAt(i)<<16-i%2*16;return p1.create(r,2*e)}},u.Utf16LE={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],o=0;o<r;o+=2){var n=_1(e[o>>>2]>>>16-o%4*8&65535);i.push(String.fromCharCode(n))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>1]|=_1(t.charCodeAt(i)<<16-i%2*16);return p1.create(r,2*e)}},U=(p=i).lib.WordArray,p.enc.Base64={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=this._map,o=(t.clamp(),[]),n=0;n<r;n+=3)for(var s=(e[n>>>2]>>>24-n%4*8&255)<<16|(e[n+1>>>2]>>>24-(n+1)%4*8&255)<<8|e[n+2>>>2]>>>24-(n+2)%4*8&255,c=0;c<4&&n+.75*c<r;c++)o.push(i.charAt(s>>>6*(3-c)&63));var a=i.charAt(64);if(a)for(;o.length%4;)o.push(a);return o.join("")},parse:function(t){var e=t.length,r=this._map;if(!(i=this._reverseMap))for(var i=this._reverseMap=[],o=0;o<r.length;o++)i[r.charCodeAt(o)]=o;for(var n,s,c=r.charAt(64),a=(!c||-1!==(c=t.indexOf(c))&&(e=c),t),h=e,l=i,f=[],d=0,u=0;u<h;u++)u%4&&(s=l[a.charCodeAt(u-1)]<<u%4*2,n=l[a.charCodeAt(u)]>>>6-u%4*2,s=s|n,f[d>>>2]|=s<<24-d%4*8,d++);return U.create(f,d)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},K=(u=i).lib.WordArray,u.enc.Base64url={stringify:function(t,e){for(var r=t.words,i=t.sigBytes,o=(e=void 0===e?!0:e)?this._safe_map:this._map,n=(t.clamp(),[]),s=0;s<i;s+=3)for(var c=(r[s>>>2]>>>24-s%4*8&255)<<16|(r[s+1>>>2]>>>24-(s+1)%4*8&255)<<8|r[s+2>>>2]>>>24-(s+2)%4*8&255,a=0;a<4&&s+.75*a<i;a++)n.push(o.charAt(c>>>6*(3-a)&63));var h=o.charAt(64);if(h)for(;n.length%4;)n.push(h);return n.join("")},parse:function(t,e){var r=t.length,i=(e=void 0===e?!0:e)?this._safe_map:this._map;if(!(o=this._reverseMap))for(var o=this._reverseMap=[],n=0;n<i.length;n++)o[i.charCodeAt(n)]=n;for(var s,c,e=i.charAt(64),a=(!e||-1!==(e=t.indexOf(e))&&(r=e),t),h=r,l=o,f=[],d=0,u=0;u<h;u++)u%4&&(c=l[a.charCodeAt(u-1)]<<u%4*2,s=l[a.charCodeAt(u)]>>>6-u%4*2,c=c|s,f[d>>>2]|=c<<24-d%4*8,d++);return K.create(f,d)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_safe_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"};for(var y1=Math,p=i,g1=(u=p.lib).WordArray,v1=u.Hasher,u=p.algo,A=[],B1=0;B1<64;B1++)A[B1]=4294967296*y1.abs(y1.sin(B1+1))|0;function z(t,e,r,i,o,n,s){t=t+(e&r|~e&i)+o+s;return(t<<n|t>>>32-n)+e}function H(t,e,r,i,o,n,s){t=t+(e&i|r&~i)+o+s;return(t<<n|t>>>32-n)+e}function C(t,e,r,i,o,n,s){t=t+(e^r^i)+o+s;return(t<<n|t>>>32-n)+e}function R(t,e,r,i,o,n,s){t=t+(r^(e|~i))+o+s;return(t<<n|t>>>32-n)+e}u=u.MD5=v1.extend({_doReset:function(){this._hash=new g1.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,e){for(var r=0;r<16;r++){var i=e+r,o=t[i];t[i]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8)}var n=this._hash.words,s=t[e+0],c=t[e+1],a=t[e+2],h=t[e+3],l=t[e+4],f=t[e+5],d=t[e+6],u=t[e+7],p=t[e+8],_=t[e+9],y=t[e+10],g=t[e+11],v=t[e+12],B=t[e+13],w=t[e+14],k=t[e+15],x=z(n[0],S=n[1],m=n[2],b=n[3],s,7,A[0]),b=z(b,x,S,m,c,12,A[1]),m=z(m,b,x,S,a,17,A[2]),S=z(S,m,b,x,h,22,A[3]);x=z(x,S,m,b,l,7,A[4]),b=z(b,x,S,m,f,12,A[5]),m=z(m,b,x,S,d,17,A[6]),S=z(S,m,b,x,u,22,A[7]),x=z(x,S,m,b,p,7,A[8]),b=z(b,x,S,m,_,12,A[9]),m=z(m,b,x,S,y,17,A[10]),S=z(S,m,b,x,g,22,A[11]),x=z(x,S,m,b,v,7,A[12]),b=z(b,x,S,m,B,12,A[13]),m=z(m,b,x,S,w,17,A[14]),x=H(x,S=z(S,m,b,x,k,22,A[15]),m,b,c,5,A[16]),b=H(b,x,S,m,d,9,A[17]),m=H(m,b,x,S,g,14,A[18]),S=H(S,m,b,x,s,20,A[19]),x=H(x,S,m,b,f,5,A[20]),b=H(b,x,S,m,y,9,A[21]),m=H(m,b,x,S,k,14,A[22]),S=H(S,m,b,x,l,20,A[23]),x=H(x,S,m,b,_,5,A[24]),b=H(b,x,S,m,w,9,A[25]),m=H(m,b,x,S,h,14,A[26]),S=H(S,m,b,x,p,20,A[27]),x=H(x,S,m,b,B,5,A[28]),b=H(b,x,S,m,a,9,A[29]),m=H(m,b,x,S,u,14,A[30]),x=C(x,S=H(S,m,b,x,v,20,A[31]),m,b,f,4,A[32]),b=C(b,x,S,m,p,11,A[33]),m=C(m,b,x,S,g,16,A[34]),S=C(S,m,b,x,w,23,A[35]),x=C(x,S,m,b,c,4,A[36]),b=C(b,x,S,m,l,11,A[37]),m=C(m,b,x,S,u,16,A[38]),S=C(S,m,b,x,y,23,A[39]),x=C(x,S,m,b,B,4,A[40]),b=C(b,x,S,m,s,11,A[41]),m=C(m,b,x,S,h,16,A[42]),S=C(S,m,b,x,d,23,A[43]),x=C(x,S,m,b,_,4,A[44]),b=C(b,x,S,m,v,11,A[45]),m=C(m,b,x,S,k,16,A[46]),x=R(x,S=C(S,m,b,x,a,23,A[47]),m,b,s,6,A[48]),b=R(b,x,S,m,u,10,A[49]),m=R(m,b,x,S,w,15,A[50]),S=R(S,m,b,x,f,21,A[51]),x=R(x,S,m,b,v,6,A[52]),b=R(b,x,S,m,h,10,A[53]),m=R(m,b,x,S,y,15,A[54]),S=R(S,m,b,x,c,21,A[55]),x=R(x,S,m,b,p,6,A[56]),b=R(b,x,S,m,k,10,A[57]),m=R(m,b,x,S,d,15,A[58]),S=R(S,m,b,x,B,21,A[59]),x=R(x,S,m,b,l,6,A[60]),b=R(b,x,S,m,g,10,A[61]),m=R(m,b,x,S,a,15,A[62]),S=R(S,m,b,x,_,21,A[63]),n[0]=n[0]+x|0,n[1]=n[1]+S|0,n[2]=n[2]+m|0,n[3]=n[3]+b|0},_doFinalize:function(){for(var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes,o=(e[i>>>5]|=128<<24-i%32,y1.floor(r/4294967296)),o=(e[15+(64+i>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),e[14+(64+i>>>9<<4)]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),t.sigBytes=4*(e.length+1),this._process(),this._hash),n=o.words,s=0;s<4;s++){var c=n[s];n[s]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8)}return o},clone:function(){var t=v1.clone.call(this);return t._hash=this._hash.clone(),t}}),p.MD5=v1._createHelper(u),p.HmacMD5=v1._createHmacHelper(u),u=(p=i).lib,X=u.WordArray,L=u.Hasher,u=p.algo,l=[],u=u.SHA1=L.extend({_doReset:function(){this._hash=new X.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var r=this._hash.words,i=r[0],o=r[1],n=r[2],s=r[3],c=r[4],a=0;a<80;a++){a<16?l[a]=0|t[e+a]:(h=l[a-3]^l[a-8]^l[a-14]^l[a-16],l[a]=h<<1|h>>>31);var h=(i<<5|i>>>27)+c+l[a];h+=a<20?1518500249+(o&n|~o&s):a<40?1859775393+(o^n^s):a<60?(o&n|o&s|n&s)-1894007588:(o^n^s)-899497514,c=s,s=n,n=o<<30|o>>>2,o=i,i=h}r[0]=r[0]+i|0,r[1]=r[1]+o|0,r[2]=r[2]+n|0,r[3]=r[3]+s|0,r[4]=r[4]+c|0},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return e[i>>>5]|=128<<24-i%32,e[14+(64+i>>>9<<4)]=Math.floor(r/4294967296),e[15+(64+i>>>9<<4)]=r,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=L.clone.call(this);return t._hash=this._hash.clone(),t}}),p.SHA1=L._createHelper(u),p.HmacSHA1=L._createHmacHelper(u);var w1=Math,p=i,k1=(u=p.lib).WordArray,x1=u.Hasher,u=p.algo,b1=[],m1=[];function S1(t){return 4294967296*(t-(0|t))|0}for(var A1=2,z1=0;z1<64;)!function(t){for(var e=w1.sqrt(t),r=2;r<=e;r++)if(!(t%r))return;return 1}(A1)||(z1<8&&(b1[z1]=S1(w1.pow(A1,.5))),m1[z1]=S1(w1.pow(A1,1/3)),z1++),A1++;var _=[],u=u.SHA256=x1.extend({_doReset:function(){this._hash=new k1.init(b1.slice(0))},_doProcessBlock:function(t,e){for(var r=this._hash.words,i=r[0],o=r[1],n=r[2],s=r[3],c=r[4],a=r[5],h=r[6],l=r[7],f=0;f<64;f++){f<16?_[f]=0|t[e+f]:(d=_[f-15],u=_[f-2],_[f]=((d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3)+_[f-7]+((u<<15|u>>>17)^(u<<13|u>>>19)^u>>>10)+_[f-16]);var d=i&o^i&n^o&n,u=l+((c<<26|c>>>6)^(c<<21|c>>>11)^(c<<7|c>>>25))+(c&a^~c&h)+m1[f]+_[f],l=h,h=a,a=c,c=s+u|0,s=n,n=o,o=i,i=u+(((i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22))+d)|0}r[0]=r[0]+i|0,r[1]=r[1]+o|0,r[2]=r[2]+n|0,r[3]=r[3]+s|0,r[4]=r[4]+c|0,r[5]=r[5]+a|0,r[6]=r[6]+h|0,r[7]=r[7]+l|0},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return e[i>>>5]|=128<<24-i%32,e[14+(64+i>>>9<<4)]=w1.floor(r/4294967296),e[15+(64+i>>>9<<4)]=r,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=x1.clone.call(this);return t._hash=this._hash.clone(),t}}),p=(p.SHA256=x1._createHelper(u),p.HmacSHA256=x1._createHmacHelper(u),j=(p=i).lib.WordArray,u=p.algo,T=u.SHA256,u=u.SHA224=T.extend({_doReset:function(){this._hash=new j.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var t=T._doFinalize.call(this);return t.sigBytes-=4,t}}),p.SHA224=T._createHelper(u),p.HmacSHA224=T._createHmacHelper(u),i),H1=p.lib.Hasher,y=(u=p.x64).Word,C1=u.WordArray,u=p.algo;function g(){return y.create.apply(y,arguments)}for(var R1=[g(1116352408,3609767458),g(1899447441,602891725),g(3049323471,3964484399),g(3921009573,2173295548),g(961987163,4081628472),g(1508970993,3053834265),g(2453635748,2937671579),g(2870763221,3664609560),g(3624381080,2734883394),g(310598401,1164996542),g(607225278,1323610764),g(1426881987,3590304994),g(1925078388,4068182383),g(2162078206,991336113),g(2614888103,633803317),g(3248222580,3479774868),g(3835390401,2666613458),g(4022224774,944711139),g(264347078,2341262773),g(604807628,2007800933),g(770255983,1495990901),g(1249150122,1856431235),g(1555081692,3175218132),g(1996064986,2198950837),g(2554220882,3999719339),g(2821834349,766784016),g(2952996808,2566594879),g(3210313671,3203337956),g(3336571891,1034457026),g(3584528711,2466948901),g(113926993,3758326383),g(338241895,168717936),g(666307205,1188179964),g(773529912,1546045734),g(1294757372,1522805485),g(1396182291,2643833823),g(1695183700,2343527390),g(1986661051,1014477480),g(2177026350,1206759142),g(2456956037,344077627),g(2730485921,1290863460),g(2820302411,3158454273),g(3259730800,3505952657),g(3345764771,106217008),g(3516065817,3606008344),g(3600352804,1432725776),g(4094571909,1467031594),g(275423344,851169720),g(430227734,3100823752),g(506948616,1363258195),g(659060556,3750685593),g(883997877,3785050280),g(958139571,3318307427),g(1322822218,3812723403),g(1537002063,2003034995),g(1747873779,3602036899),g(1955562222,1575990012),g(2024104815,1125592928),g(2227730452,2716904306),g(2361852424,442776044),g(2428436474,593698344),g(2756734187,3733110249),g(3204031479,2999351573),g(3329325298,3815920427),g(3391569614,3928383900),g(3515267271,566280711),g(3940187606,3454069534),g(4118630271,4000239992),g(116418474,1914138554),g(174292421,2731055270),g(289380356,3203993006),g(460393269,320620315),g(685471733,587496836),g(852142971,1086792851),g(1017036298,365543100),g(1126000580,2618297676),g(1288033470,3409855158),g(1501505948,4234509866),g(1607167915,987167468),g(1816402316,1246189591)],D1=[],E1=0;E1<80;E1++)D1[E1]=g();u=u.SHA512=H1.extend({_doReset:function(){this._hash=new C1.init([new y.init(1779033703,4089235720),new y.init(3144134277,2227873595),new y.init(1013904242,4271175723),new y.init(2773480762,1595750129),new y.init(1359893119,2917565137),new y.init(2600822924,725511199),new y.init(528734635,4215389547),new y.init(1541459225,327033209)])},_doProcessBlock:function(W,O){for(var t=this._hash.words,e=t[0],r=t[1],i=t[2],o=t[3],n=t[4],s=t[5],c=t[6],t=t[7],I=e.high,a=e.low,U=r.high,h=r.low,K=i.high,l=i.low,X=o.high,f=o.low,L=n.high,d=n.low,j=s.high,u=s.low,T=c.high,p=c.low,N=t.high,_=t.low,y=I,g=a,v=U,B=h,w=K,k=l,q=X,x=f,b=L,m=d,Z=j,S=u,V=T,G=p,J=N,Q=_,A=0;A<80;A++)var z,H,C=D1[A],R=(A<16?(H=C.high=0|W[O+2*A],z=C.low=0|W[O+2*A+1]):(F=(P=D1[A-15]).high,P=P.low,M=(E=D1[A-2]).high,E=E.low,D=(R=D1[A-7]).high,R=R.low,$=(Y=D1[A-16]).high,H=(H=((F>>>1|P<<31)^(F>>>8|P<<24)^F>>>7)+D+((z=(D=(P>>>1|F<<31)^(P>>>8|F<<24)^(P>>>7|F<<25))+R)>>>0<D>>>0?1:0))+((M>>>19|E<<13)^(M<<3|E>>>29)^M>>>6)+((z+=P=(E>>>19|M<<13)^(E<<3|M>>>29)^(E>>>6|M<<26))>>>0<P>>>0?1:0),z+=F=Y.low,C.high=H=H+$+(z>>>0<F>>>0?1:0),C.low=z),b&Z^~b&V),D=m&S^~m&G,E=y&v^y&w^v&w,M=(g>>>28|y<<4)^(g<<30|y>>>2)^(g<<25|y>>>7),P=R1[A],Y=P.high,$=P.low,F=Q+((m>>>14|b<<18)^(m>>>18|b<<14)^(m<<23|b>>>9)),C=J+((b>>>14|m<<18)^(b>>>18|m<<14)^(b<<23|m>>>9))+(F>>>0<Q>>>0?1:0),t1=M+(g&B^g&k^B&k),J=V,Q=G,V=Z,G=S,Z=b,S=m,b=q+(C=C+R+((F=F+D)>>>0<D>>>0?1:0)+Y+((F=F+$)>>>0<$>>>0?1:0)+H+((F=F+z)>>>0<z>>>0?1:0))+((m=x+F|0)>>>0<x>>>0?1:0)|0,q=w,x=k,w=v,k=B,v=y,B=g,y=C+(((y>>>28|g<<4)^(y<<30|g>>>2)^(y<<25|g>>>7))+E+(t1>>>0<M>>>0?1:0))+((g=F+t1|0)>>>0<F>>>0?1:0)|0;a=e.low=a+g,e.high=I+y+(a>>>0<g>>>0?1:0),h=r.low=h+B,r.high=U+v+(h>>>0<B>>>0?1:0),l=i.low=l+k,i.high=K+w+(l>>>0<k>>>0?1:0),f=o.low=f+x,o.high=X+q+(f>>>0<x>>>0?1:0),d=n.low=d+m,n.high=L+b+(d>>>0<m>>>0?1:0),u=s.low=u+S,s.high=j+Z+(u>>>0<S>>>0?1:0),p=c.low=p+G,c.high=T+V+(p>>>0<G>>>0?1:0),_=t.low=_+Q,t.high=N+J+(_>>>0<Q>>>0?1:0)},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return e[i>>>5]|=128<<24-i%32,e[30+(128+i>>>10<<5)]=Math.floor(r/4294967296),e[31+(128+i>>>10<<5)]=r,t.sigBytes=4*e.length,this._process(),this._hash.toX32()},clone:function(){var t=H1.clone.call(this);return t._hash=this._hash.clone(),t},blockSize:32}),p.SHA512=H1._createHelper(u),p.HmacSHA512=H1._createHmacHelper(u),u=(p=i).x64,t=u.Word,N=u.WordArray,u=p.algo,q=u.SHA512,u=u.SHA384=q.extend({_doReset:function(){this._hash=new N.init([new t.init(3418070365,3238371032),new t.init(1654270250,914150663),new t.init(2438529370,812702999),new t.init(355462360,4144912697),new t.init(1731405415,4290775857),new t.init(2394180231,1750603025),new t.init(3675008525,1694076839),new t.init(1203062813,3204075428)])},_doFinalize:function(){var t=q._doFinalize.call(this);return t.sigBytes-=16,t}}),p.SHA384=q._createHelper(u),p.HmacSHA384=q._createHmacHelper(u);for(var M1=Math,p=i,P1=(u=p.lib).WordArray,F1=u.Hasher,W1=p.x64.Word,u=p.algo,O1=[],I1=[],U1=[],v=1,B=0,K1=0;K1<24;K1++){O1[v+5*B]=(K1+1)*(K1+2)/2%64;var X1=(2*v+3*B)%5;v=B%5,B=X1}for(v=0;v<5;v++)for(B=0;B<5;B++)I1[v+5*B]=B+(2*v+3*B)%5*5;for(var L1=1,j1=0;j1<24;j1++){for(var T1,N1=0,q1=0,Z1=0;Z1<7;Z1++)1&L1&&((T1=(1<<Z1)-1)<32?q1^=1<<T1:N1^=1<<T1-32),128&L1?L1=L1<<1^113:L1<<=1;U1[j1]=W1.create(N1,q1)}for(var D=[],V1=0;V1<25;V1++)D[V1]=W1.create();function G1(t,e,r){return t&e|~t&r}function J1(t,e,r){return t&r|e&~r}function Q1(t,e){return t<<e|t>>>32-e}function Y1(t){return"string"==typeof t?f1:o}function $1(t,e,r){var i,o=this._iv;o?(i=o,this._iv=void 0):i=this._prevBlock;for(var n=0;n<r;n++)t[e+n]^=i[n]}function t2(t,e,r,i){var o,n=this._iv;n?(o=n.slice(0),this._iv=void 0):o=this._prevBlock,i.encryptBlock(o,0);for(var s=0;s<r;s++)t[e+s]^=o[s]}function e2(t){var e,r,i;return 255==(t>>24&255)?(r=t>>8&255,i=255&t,255===(e=t>>16&255)?(e=0,255===r?(r=0,255===i?i=0:++i):++r):++e,t=0,t=(t+=e<<16)+(r<<8)+i):t+=1<<24,t}u=u.SHA3=F1.extend({cfg:F1.cfg.extend({outputLength:512}),_doReset:function(){for(var t=this._state=[],e=0;e<25;e++)t[e]=new W1.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(t,e){for(var r=this._state,i=this.blockSize/2,o=0;o<i;o++){var n=t[e+2*o],s=t[e+2*o+1],n=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8);(x=r[o]).high^=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),x.low^=n}for(var c=0;c<24;c++){for(var a=0;a<5;a++){for(var h=0,l=0,f=0;f<5;f++)h^=(x=r[a+5*f]).high,l^=x.low;var d=D[a];d.high=h,d.low=l}for(a=0;a<5;a++)for(var u=D[(a+4)%5],p=D[(a+1)%5],_=p.high,p=p.low,h=u.high^(_<<1|p>>>31),l=u.low^(p<<1|_>>>31),f=0;f<5;f++)(x=r[a+5*f]).high^=h,x.low^=l;for(var y=1;y<25;y++){var g=(x=r[y]).high,v=x.low,B=O1[y],g=(l=B<32?(h=g<<B|v>>>32-B,v<<B|g>>>32-B):(h=v<<B-32|g>>>64-B,g<<B-32|v>>>64-B),D[I1[y]]);g.high=h,g.low=l}var w=D[0],k=r[0];w.high=k.high,w.low=k.low;for(a=0;a<5;a++)for(f=0;f<5;f++){var x=r[y=a+5*f],b=D[y],m=D[(a+1)%5+5*f],S=D[(a+2)%5+5*f];x.high=b.high^~m.high&S.high,x.low=b.low^~m.low&S.low}x=r[0],w=U1[c];x.high^=w.high,x.low^=w.low}},_doFinalize:function(){for(var t=this._data,e=t.words,r=(this._nDataBytes,8*t.sigBytes),i=32*this.blockSize,o=(e[r>>>5]|=1<<24-r%32,e[(M1.ceil((1+r)/i)*i>>>5)-1]|=128,t.sigBytes=4*e.length,this._process(),this._state),r=this.cfg.outputLength/8,n=r/8,s=[],c=0;c<n;c++){var a=o[c],h=a.high,a=a.low,h=16711935&(h<<8|h>>>24)|4278255360&(h<<24|h>>>8);s.push(16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8)),s.push(h)}return new P1.init(s,r)},clone:function(){for(var t=F1.clone.call(this),e=t._state=this._state.slice(0),r=0;r<25;r++)e[r]=e[r].clone();return t}}),p.SHA3=F1._createHelper(u),p.HmacSHA3=F1._createHmacHelper(u),Math,u=(p=i).lib,e=u.WordArray,Z=u.Hasher,u=p.algo,V=e.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),G=e.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),J=e.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),Q=e.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),Y=e.create([0,1518500249,1859775393,2400959708,2840853838]),$=e.create([1352829926,1548603684,1836072691,2053994217,0]),u=u.RIPEMD160=Z.extend({_doReset:function(){this._hash=e.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var r=0;r<16;r++){var i=e+r,o=t[i];t[i]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8)}for(var n,s,c,a,h,l,f=this._hash.words,d=Y.words,u=$.words,p=V.words,_=G.words,y=J.words,g=Q.words,v=n=f[0],B=s=f[1],w=c=f[2],k=a=f[3],x=h=f[4],r=0;r<80;r+=1)l=(l=Q1(l=(l=n+t[e+p[r]]|0)+(r<16?(s^c^a)+d[0]:r<32?G1(s,c,a)+d[1]:r<48?((s|~c)^a)+d[2]:r<64?J1(s,c,a)+d[3]:(s^(c|~a))+d[4])|0,y[r]))+h|0,n=h,h=a,a=Q1(c,10),c=s,s=l,l=(l=Q1(l=(l=v+t[e+_[r]]|0)+(r<16?(B^(w|~k))+u[0]:r<32?J1(B,w,k)+u[1]:r<48?((B|~w)^k)+u[2]:r<64?G1(B,w,k)+u[3]:(B^w^k)+u[4])|0,g[r]))+x|0,v=x,x=k,k=Q1(w,10),w=B,B=l;l=f[1]+c+k|0,f[1]=f[2]+a+x|0,f[2]=f[3]+h+v|0,f[3]=f[4]+n+B|0,f[4]=f[0]+s+w|0,f[0]=l},_doFinalize:function(){for(var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes,i=(e[i>>>5]|=128<<24-i%32,e[14+(64+i>>>9<<4)]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),t.sigBytes=4*(e.length+1),this._process(),this._hash),o=i.words,n=0;n<5;n++){var s=o[n];o[n]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8)}return i},clone:function(){var t=Z.clone.call(this);return t._hash=this._hash.clone(),t}}),p.RIPEMD160=Z._createHelper(u),p.HmacRIPEMD160=Z._createHmacHelper(u),u=(p=i).lib.Base,t1=p.enc.Utf8,p.algo.HMAC=u.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=t1.parse(e));for(var r=t.blockSize,i=4*r,t=((e=e.sigBytes>i?t.finalize(e):e).clamp(),this._oKey=e.clone()),e=this._iKey=e.clone(),o=t.words,n=e.words,s=0;s<r;s++)o[s]^=1549556828,n[s]^=909522486;t.sigBytes=e.sigBytes=i,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,t=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(t))}}),u=(p=i).lib,w=u.Base,e1=u.WordArray,u=p.algo,P=u.SHA256,r1=u.HMAC,i1=u.PBKDF2=w.extend({cfg:w.extend({keySize:4,hasher:P,iterations:25e4}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var r=this.cfg,i=r1.create(r.hasher,t),o=e1.create(),n=e1.create([1]),s=o.words,c=n.words,a=r.keySize,h=r.iterations;s.length<a;){for(var l=i.update(e).finalize(n),f=(i.reset(),l.words),d=f.length,u=l,p=1;p<h;p++){u=i.finalize(u),i.reset();for(var _=u.words,y=0;y<d;y++)f[y]^=_[y]}o.concat(l),c[0]++}return o.sigBytes=4*a,o}}),p.PBKDF2=function(t,e,r){return i1.create(r).compute(t,e)},w=(u=i).lib,P=w.Base,o1=w.WordArray,w=u.algo,p=w.MD5,n1=w.EvpKDF=P.extend({cfg:P.extend({keySize:4,hasher:p,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var r,i=this.cfg,o=i.hasher.create(),n=o1.create(),s=n.words,c=i.keySize,a=i.iterations;s.length<c;){r&&o.update(r),r=o.update(t).finalize(e),o.reset();for(var h=1;h<a;h++)r=o.finalize(r),o.reset();n.concat(r)}return n.sigBytes=4*c,n}}),u.EvpKDF=function(t,e,r){return n1.create(r).compute(t,e)},i.lib.Cipher||(P=(w=i).lib,p=P.Base,s=P.WordArray,s1=P.BufferedBlockAlgorithm,(u=w.enc).Utf8,c1=u.Base64,a1=w.algo.EvpKDF,h1=P.Cipher=s1.extend({cfg:p.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){s1.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(i){return{encrypt:function(t,e,r){return Y1(e).encrypt(i,t,e,r)},decrypt:function(t,e,r){return Y1(e).decrypt(i,t,e,r)}}}}),P.StreamCipher=h1.extend({_doFinalize:function(){return this._process(!0)},blockSize:1}),u=w.mode={},r=P.BlockCipherMode=p.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),r=u.CBC=((u=r.extend()).Encryptor=u.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize;$1.call(this,t,e,i),r.encryptBlock(t,e),this._prevBlock=t.slice(e,e+i)}}),u.Decryptor=u.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,o=t.slice(e,e+i);r.decryptBlock(t,e),$1.call(this,t,e,i),this._prevBlock=o}}),u),u=(w.pad={}).Pkcs7={pad:function(t,e){for(var e=4*e,r=e-t.sigBytes%e,i=r<<24|r<<16|r<<8|r,o=[],n=0;n<r;n+=4)o.push(i);e=s.create(o,r);t.concat(e)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},P.BlockCipher=h1.extend({cfg:h1.cfg.extend({mode:r,padding:u}),reset:function(){h1.reset.call(this);var t,e=this.cfg,r=e.iv,e=e.mode;this._xformMode==this._ENC_XFORM_MODE?t=e.createEncryptor:(t=e.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==t?this._mode.init(this,r&&r.words):(this._mode=t.call(e,this,r&&r.words),this._mode.__creator=t)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t,e=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(e.pad(this._data,this.blockSize),t=this._process(!0)):(t=this._process(!0),e.unpad(t)),t},blockSize:4}),l1=P.CipherParams=p.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}}),r=(w.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext,t=t.salt,t=t?s.create([1398893684,1701076831]).concat(t).concat(e):e;return t.toString(c1)},parse:function(t){var e,t=c1.parse(t),r=t.words;return 1398893684==r[0]&&1701076831==r[1]&&(e=s.create(r.slice(2,4)),r.splice(0,4),t.sigBytes-=16),l1.create({ciphertext:t,salt:e})}},o=P.SerializableCipher=p.extend({cfg:p.extend({format:r}),encrypt:function(t,e,r,i){i=this.cfg.extend(i);var o=t.createEncryptor(r,i),e=o.finalize(e),o=o.cfg;return l1.create({ciphertext:e,key:r,iv:o.iv,algorithm:t,mode:o.mode,padding:o.padding,blockSize:t.blockSize,formatter:i.format})},decrypt:function(t,e,r,i){return i=this.cfg.extend(i),e=this._parse(e,i.format),t.createDecryptor(r,i).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),u=(w.kdf={}).OpenSSL={execute:function(t,e,r,i,o){i=i||s.random(8),o=(o?a1.create({keySize:e+r,hasher:o}):a1.create({keySize:e+r})).compute(t,i);t=s.create(o.words.slice(e),4*r);return o.sigBytes=4*e,l1.create({key:o,iv:t,salt:i})}},f1=P.PasswordBasedCipher=o.extend({cfg:o.cfg.extend({kdf:u}),encrypt:function(t,e,r,i){r=(i=this.cfg.extend(i)).kdf.execute(r,t.keySize,t.ivSize,i.salt,i.hasher),i.iv=r.iv,t=o.encrypt.call(this,t,e,r.key,i);return t.mixIn(r),t},decrypt:function(t,e,r,i){i=this.cfg.extend(i),e=this._parse(e,i.format);r=i.kdf.execute(r,t.keySize,t.ivSize,e.salt,i.hasher);return i.iv=r.iv,o.decrypt.call(this,t,e,r.key,i)}})),i.mode.CFB=((p=i.lib.BlockCipherMode.extend()).Encryptor=p.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize;t2.call(this,t,e,i,r),this._prevBlock=t.slice(e,e+i)}}),p.Decryptor=p.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,o=t.slice(e,e+i);t2.call(this,t,e,i,r),this._prevBlock=o}}),p),i.mode.CTR=(r=i.lib.BlockCipherMode.extend(),w=r.Encryptor=r.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,o=this._iv,n=this._counter,s=(o&&(n=this._counter=o.slice(0),this._iv=void 0),n.slice(0));r.encryptBlock(s,0),n[i-1]=n[i-1]+1|0;for(var c=0;c<i;c++)t[e+c]^=s[c]}}),r.Decryptor=w,r),i.mode.CTRGladman=(P=i.lib.BlockCipherMode.extend(),u=P.Encryptor=P.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,o=this._iv,n=this._counter,s=(o&&(n=this._counter=o.slice(0),this._iv=void 0),0===((o=n)[0]=e2(o[0]))&&(o[1]=e2(o[1])),n.slice(0));r.encryptBlock(s,0);for(var c=0;c<i;c++)t[e+c]^=s[c]}}),P.Decryptor=u,P),i.mode.OFB=(p=i.lib.BlockCipherMode.extend(),w=p.Encryptor=p.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,o=this._iv,n=this._keystream;o&&(n=this._keystream=o.slice(0),this._iv=void 0),r.encryptBlock(n,0);for(var s=0;s<i;s++)t[e+s]^=n[s]}}),p.Decryptor=w,p),i.mode.ECB=((u=i.lib.BlockCipherMode.extend()).Encryptor=u.extend({processBlock:function(t,e){this._cipher.encryptBlock(t,e)}}),u.Decryptor=u.extend({processBlock:function(t,e){this._cipher.decryptBlock(t,e)}}),u),i.pad.AnsiX923={pad:function(t,e){var r=t.sigBytes,e=4*e,e=e-r%e,r=r+e-1;t.clamp(),t.words[r>>>2]|=e<<24-r%4*8,t.sigBytes+=e},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},i.pad.Iso10126={pad:function(t,e){e*=4,e-=t.sigBytes%e;t.concat(i.lib.WordArray.random(e-1)).concat(i.lib.WordArray.create([e<<24],1))},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},i.pad.Iso97971={pad:function(t,e){t.concat(i.lib.WordArray.create([2147483648],1)),i.pad.ZeroPadding.pad(t,e)},unpad:function(t){i.pad.ZeroPadding.unpad(t),t.sigBytes--}},i.pad.ZeroPadding={pad:function(t,e){e*=4;t.clamp(),t.sigBytes+=e-(t.sigBytes%e||e)},unpad:function(t){for(var e=t.words,r=t.sigBytes-1,r=t.sigBytes-1;0<=r;r--)if(e[r>>>2]>>>24-r%4*8&255){t.sigBytes=r+1;break}}},i.pad.NoPadding={pad:function(){},unpad:function(){}},d1=(P=i).lib.CipherParams,u1=P.enc.Hex,P.format.Hex={stringify:function(t){return t.ciphertext.toString(u1)},parse:function(t){t=u1.parse(t);return d1.create({ciphertext:t})}};for(var w=i,p=w.lib.BlockCipher,u=w.algo,k=[],r2=[],i2=[],o2=[],n2=[],s2=[],c2=[],a2=[],h2=[],l2=[],x=[],b=0;b<256;b++)x[b]=b<128?b<<1:b<<1^283;for(var m=0,S=0,b=0;b<256;b++){var E=S^S<<1^S<<2^S<<3^S<<4,f2=(k[m]=E=E>>>8^255&E^99,x[r2[E]=m]),d2=x[f2],u2=x[d2],M=257*x[E]^16843008*E;i2[m]=M<<24|M>>>8,o2[m]=M<<16|M>>>16,n2[m]=M<<8|M>>>24,s2[m]=M,c2[E]=(M=16843009*u2^65537*d2^257*f2^16843008*m)<<24|M>>>8,a2[E]=M<<16|M>>>16,h2[E]=M<<8|M>>>24,l2[E]=M,m?(m=f2^x[x[x[u2^f2]]],S^=x[x[S]]):m=S=1}var p2=[0,1,2,4,8,16,32,64,128,27,54],u=u.AES=p.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var t=this._keyPriorReset=this._key,e=t.words,r=t.sigBytes/4,i=4*(1+(this._nRounds=6+r)),o=this._keySchedule=[],n=0;n<i;n++)n<r?o[n]=e[n]:(a=o[n-1],n%r?6<r&&n%r==4&&(a=k[a>>>24]<<24|k[a>>>16&255]<<16|k[a>>>8&255]<<8|k[255&a]):(a=k[(a=a<<8|a>>>24)>>>24]<<24|k[a>>>16&255]<<16|k[a>>>8&255]<<8|k[255&a],a^=p2[n/r|0]<<24),o[n]=o[n-r]^a);for(var s=this._invKeySchedule=[],c=0;c<i;c++){var a,n=i-c;a=c%4?o[n]:o[n-4],s[c]=c<4||n<=4?a:c2[k[a>>>24]]^a2[k[a>>>16&255]]^h2[k[a>>>8&255]]^l2[k[255&a]]}}},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,i2,o2,n2,s2,k)},decryptBlock:function(t,e){var r=t[e+1],r=(t[e+1]=t[e+3],t[e+3]=r,this._doCryptBlock(t,e,this._invKeySchedule,c2,a2,h2,l2,r2),t[e+1]);t[e+1]=t[e+3],t[e+3]=r},_doCryptBlock:function(t,e,r,i,o,n,s,c){for(var a=this._nRounds,h=t[e]^r[0],l=t[e+1]^r[1],f=t[e+2]^r[2],d=t[e+3]^r[3],u=4,p=1;p<a;p++)var _=i[h>>>24]^o[l>>>16&255]^n[f>>>8&255]^s[255&d]^r[u++],y=i[l>>>24]^o[f>>>16&255]^n[d>>>8&255]^s[255&h]^r[u++],g=i[f>>>24]^o[d>>>16&255]^n[h>>>8&255]^s[255&l]^r[u++],v=i[d>>>24]^o[h>>>16&255]^n[l>>>8&255]^s[255&f]^r[u++],h=_,l=y,f=g,d=v;_=(c[h>>>24]<<24|c[l>>>16&255]<<16|c[f>>>8&255]<<8|c[255&d])^r[u++],y=(c[l>>>24]<<24|c[f>>>16&255]<<16|c[d>>>8&255]<<8|c[255&h])^r[u++],g=(c[f>>>24]<<24|c[d>>>16&255]<<16|c[h>>>8&255]<<8|c[255&l])^r[u++],v=(c[d>>>24]<<24|c[h>>>16&255]<<16|c[l>>>8&255]<<8|c[255&f])^r[u++];t[e]=_,t[e+1]=y,t[e+2]=g,t[e+3]=v},keySize:8}),P=(w.AES=p._createHelper(u),i),_2=(w=P.lib).WordArray,w=w.BlockCipher,p=P.algo,y2=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],g2=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],v2=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],B2=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],w2=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],k2=p.DES=w.extend({_doReset:function(){for(var t=this._key.words,e=[],r=0;r<56;r++){var i=y2[r]-1;e[r]=t[i>>>5]>>>31-i%32&1}for(var o=this._subKeys=[],n=0;n<16;n++){for(var s=o[n]=[],c=v2[n],r=0;r<24;r++)s[r/6|0]|=e[(g2[r]-1+c)%28]<<31-r%6,s[4+(r/6|0)]|=e[28+(g2[r+24]-1+c)%28]<<31-r%6;s[0]=s[0]<<1|s[0]>>>31;for(r=1;r<7;r++)s[r]=s[r]>>>4*(r-1)+3;s[7]=s[7]<<5|s[7]>>>27}for(var a=this._invSubKeys=[],r=0;r<16;r++)a[r]=o[15-r]},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._subKeys)},decryptBlock:function(t,e){this._doCryptBlock(t,e,this._invSubKeys)},_doCryptBlock:function(t,e,r){this._lBlock=t[e],this._rBlock=t[e+1],x2.call(this,4,252645135),x2.call(this,16,65535),b2.call(this,2,858993459),b2.call(this,8,16711935),x2.call(this,1,1431655765);for(var i=0;i<16;i++){for(var o=r[i],n=this._lBlock,s=this._rBlock,c=0,a=0;a<8;a++)c|=B2[a][((s^o[a])&w2[a])>>>0];this._lBlock=s,this._rBlock=n^c}var h=this._lBlock;this._lBlock=this._rBlock,this._rBlock=h,x2.call(this,1,1431655765),b2.call(this,8,16711935),b2.call(this,2,858993459),x2.call(this,16,65535),x2.call(this,4,252645135),t[e]=this._lBlock,t[e+1]=this._rBlock},keySize:2,ivSize:2,blockSize:2});function x2(t,e){e=(this._lBlock>>>t^this._rBlock)&e;this._rBlock^=e,this._lBlock^=e<<t}function b2(t,e){e=(this._rBlock>>>t^this._lBlock)&e;this._lBlock^=e,this._rBlock^=e<<t}P.DES=w._createHelper(k2),p=p.TripleDES=w.extend({_doReset:function(){var t=this._key.words;if(2!==t.length&&4!==t.length&&t.length<6)throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");var e=t.slice(0,2),r=t.length<4?t.slice(0,2):t.slice(2,4),t=t.length<6?t.slice(0,2):t.slice(4,6);this._des1=k2.createEncryptor(_2.create(e)),this._des2=k2.createEncryptor(_2.create(r)),this._des3=k2.createEncryptor(_2.create(t))},encryptBlock:function(t,e){this._des1.encryptBlock(t,e),this._des2.decryptBlock(t,e),this._des3.encryptBlock(t,e)},decryptBlock:function(t,e){this._des3.decryptBlock(t,e),this._des2.encryptBlock(t,e),this._des1.decryptBlock(t,e)},keySize:6,ivSize:2,blockSize:2}),P.TripleDES=w._createHelper(p);var u=i,P=u.lib.StreamCipher,w=u.algo,m2=w.RC4=P.extend({_doReset:function(){for(var t=this._key,e=t.words,r=t.sigBytes,i=this._S=[],o=0;o<256;o++)i[o]=o;for(var o=0,n=0;o<256;o++){var s=o%r,s=e[s>>>2]>>>24-s%4*8&255,n=(n+i[o]+s)%256,s=i[o];i[o]=i[n],i[n]=s}this._i=this._j=0},_doProcessBlock:function(t,e){t[e]^=S2.call(this)},keySize:8,ivSize:0});function S2(){for(var t=this._S,e=this._i,r=this._j,i=0,o=0;o<4;o++){var r=(r+t[e=(e+1)%256])%256,n=t[e];t[e]=t[r],t[r]=n,i|=t[(t[e]+t[r])%256]<<24-8*o}return this._i=e,this._j=r,i}function A2(){for(var t=this._X,e=this._C,r=0;r<8;r++)c[r]=e[r];e[0]=e[0]+1295307597+this._b|0,e[1]=e[1]+3545052371+(e[0]>>>0<c[0]>>>0?1:0)|0,e[2]=e[2]+886263092+(e[1]>>>0<c[1]>>>0?1:0)|0,e[3]=e[3]+1295307597+(e[2]>>>0<c[2]>>>0?1:0)|0,e[4]=e[4]+3545052371+(e[3]>>>0<c[3]>>>0?1:0)|0,e[5]=e[5]+886263092+(e[4]>>>0<c[4]>>>0?1:0)|0,e[6]=e[6]+1295307597+(e[5]>>>0<c[5]>>>0?1:0)|0,e[7]=e[7]+3545052371+(e[6]>>>0<c[6]>>>0?1:0)|0,this._b=e[7]>>>0<c[7]>>>0?1:0;for(r=0;r<8;r++){var i=t[r]+e[r],o=65535&i,n=i>>>16;a[r]=((o*o>>>17)+o*n>>>15)+n*n^((4294901760&i)*i|0)+((65535&i)*i|0)}t[0]=a[0]+(a[7]<<16|a[7]>>>16)+(a[6]<<16|a[6]>>>16)|0,t[1]=a[1]+(a[0]<<8|a[0]>>>24)+a[7]|0,t[2]=a[2]+(a[1]<<16|a[1]>>>16)+(a[0]<<16|a[0]>>>16)|0,t[3]=a[3]+(a[2]<<8|a[2]>>>24)+a[1]|0,t[4]=a[4]+(a[3]<<16|a[3]>>>16)+(a[2]<<16|a[2]>>>16)|0,t[5]=a[5]+(a[4]<<8|a[4]>>>24)+a[3]|0,t[6]=a[6]+(a[5]<<16|a[5]>>>16)+(a[4]<<16|a[4]>>>16)|0,t[7]=a[7]+(a[6]<<8|a[6]>>>24)+a[5]|0}function z2(){for(var t=this._X,e=this._C,r=0;r<8;r++)f[r]=e[r];e[0]=e[0]+1295307597+this._b|0,e[1]=e[1]+3545052371+(e[0]>>>0<f[0]>>>0?1:0)|0,e[2]=e[2]+886263092+(e[1]>>>0<f[1]>>>0?1:0)|0,e[3]=e[3]+1295307597+(e[2]>>>0<f[2]>>>0?1:0)|0,e[4]=e[4]+3545052371+(e[3]>>>0<f[3]>>>0?1:0)|0,e[5]=e[5]+886263092+(e[4]>>>0<f[4]>>>0?1:0)|0,e[6]=e[6]+1295307597+(e[5]>>>0<f[5]>>>0?1:0)|0,e[7]=e[7]+3545052371+(e[6]>>>0<f[6]>>>0?1:0)|0,this._b=e[7]>>>0<f[7]>>>0?1:0;for(r=0;r<8;r++){var i=t[r]+e[r],o=65535&i,n=i>>>16;d[r]=((o*o>>>17)+o*n>>>15)+n*n^((4294901760&i)*i|0)+((65535&i)*i|0)}t[0]=d[0]+(d[7]<<16|d[7]>>>16)+(d[6]<<16|d[6]>>>16)|0,t[1]=d[1]+(d[0]<<8|d[0]>>>24)+d[7]|0,t[2]=d[2]+(d[1]<<16|d[1]>>>16)+(d[0]<<16|d[0]>>>16)|0,t[3]=d[3]+(d[2]<<8|d[2]>>>24)+d[1]|0,t[4]=d[4]+(d[3]<<16|d[3]>>>16)+(d[2]<<16|d[2]>>>16)|0,t[5]=d[5]+(d[4]<<8|d[4]>>>24)+d[3]|0,t[6]=d[6]+(d[5]<<16|d[5]>>>16)+(d[4]<<16|d[4]>>>16)|0,t[7]=d[7]+(d[6]<<8|d[6]>>>24)+d[5]|0}u.RC4=P._createHelper(m2),w=w.RC4Drop=m2.extend({cfg:m2.cfg.extend({drop:192}),_doReset:function(){m2._doReset.call(this);for(var t=this.cfg.drop;0<t;t--)S2.call(this)}}),u.RC4Drop=P._createHelper(w),u=(p=i).lib.StreamCipher,P=p.algo,n=[],c=[],a=[],P=P.Rabbit=u.extend({_doReset:function(){for(var t=this._key.words,e=this.cfg.iv,r=0;r<4;r++)t[r]=16711935&(t[r]<<8|t[r]>>>24)|4278255360&(t[r]<<24|t[r]>>>8);for(var i=this._X=[t[0],t[3]<<16|t[2]>>>16,t[1],t[0]<<16|t[3]>>>16,t[2],t[1]<<16|t[0]>>>16,t[3],t[2]<<16|t[1]>>>16],o=this._C=[t[2]<<16|t[2]>>>16,4294901760&t[0]|65535&t[1],t[3]<<16|t[3]>>>16,4294901760&t[1]|65535&t[2],t[0]<<16|t[0]>>>16,4294901760&t[2]|65535&t[3],t[1]<<16|t[1]>>>16,4294901760&t[3]|65535&t[0]],r=this._b=0;r<4;r++)A2.call(this);for(r=0;r<8;r++)o[r]^=i[r+4&7];if(e){var e=e.words,n=e[0],e=e[1],n=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8),e=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8),s=n>>>16|4294901760&e,c=e<<16|65535&n;o[0]^=n,o[1]^=s,o[2]^=e,o[3]^=c,o[4]^=n,o[5]^=s,o[6]^=e,o[7]^=c;for(r=0;r<4;r++)A2.call(this)}},_doProcessBlock:function(t,e){var r=this._X;A2.call(this),n[0]=r[0]^r[5]>>>16^r[3]<<16,n[1]=r[2]^r[7]>>>16^r[5]<<16,n[2]=r[4]^r[1]>>>16^r[7]<<16,n[3]=r[6]^r[3]>>>16^r[1]<<16;for(var i=0;i<4;i++)n[i]=16711935&(n[i]<<8|n[i]>>>24)|4278255360&(n[i]<<24|n[i]>>>8),t[e+i]^=n[i]},blockSize:4,ivSize:2}),p.Rabbit=u._createHelper(P),p=(w=i).lib.StreamCipher,u=w.algo,h=[],f=[],d=[],u=u.RabbitLegacy=p.extend({_doReset:function(){for(var t=this._key.words,e=this.cfg.iv,r=this._X=[t[0],t[3]<<16|t[2]>>>16,t[1],t[0]<<16|t[3]>>>16,t[2],t[1]<<16|t[0]>>>16,t[3],t[2]<<16|t[1]>>>16],i=this._C=[t[2]<<16|t[2]>>>16,4294901760&t[0]|65535&t[1],t[3]<<16|t[3]>>>16,4294901760&t[1]|65535&t[2],t[0]<<16|t[0]>>>16,4294901760&t[2]|65535&t[3],t[1]<<16|t[1]>>>16,4294901760&t[3]|65535&t[0]],o=this._b=0;o<4;o++)z2.call(this);for(o=0;o<8;o++)i[o]^=r[o+4&7];if(e){var t=e.words,e=t[0],t=t[1],e=16711935&(e<<8|e>>>24)|4278255360&(e<<24|e>>>8),t=16711935&(t<<8|t>>>24)|4278255360&(t<<24|t>>>8),n=e>>>16|4294901760&t,s=t<<16|65535&e;i[0]^=e,i[1]^=n,i[2]^=t,i[3]^=s,i[4]^=e,i[5]^=n,i[6]^=t,i[7]^=s;for(o=0;o<4;o++)z2.call(this)}},_doProcessBlock:function(t,e){var r=this._X;z2.call(this),h[0]=r[0]^r[5]>>>16^r[3]<<16,h[1]=r[2]^r[7]>>>16^r[5]<<16,h[2]=r[4]^r[1]>>>16^r[7]<<16,h[3]=r[6]^r[3]>>>16^r[1]<<16;for(var i=0;i<4;i++)h[i]=16711935&(h[i]<<8|h[i]>>>24)|4278255360&(h[i]<<24|h[i]>>>8),t[e+i]^=h[i]},blockSize:4,ivSize:2}),w.RabbitLegacy=p._createHelper(u);{w=(P=i).lib.BlockCipher,p=P.algo;const F=16,D2=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],E2=[[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946],[1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055],[3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504],[976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462]];var H2={pbox:[],sbox:[]};function C2(t,e){var r=t.sbox[0][e>>24&255]+t.sbox[1][e>>16&255];return r=(r^=t.sbox[2][e>>8&255])+t.sbox[3][255&e]}function R2(e,t,r){let i=t,o=r,n;for(let t=0;t<F;++t)i^=e.pbox[t],o=C2(e,i)^o,n=i,i=o,o=n;return n=i,i=o,o=n,o^=e.pbox[F],{left:i^=e.pbox[F+1],right:o}}p=p.Blowfish=w.extend({_doReset:function(){if(this._keyPriorReset!==this._key){var t=this._keyPriorReset=this._key,n=t.words,t=t.sigBytes/4;{var s=H2,c=n,a=t;for(let e=0;e<4;e++){s.sbox[e]=[];for(let t=0;t<256;t++)s.sbox[e][t]=E2[e][t]}let e=0;for(let t=0;t<F+2;t++)s.pbox[t]=D2[t]^c[e],++e>=a&&(e=0);let r=0,i=0,o=0;for(let t=0;t<F+2;t+=2)o=R2(s,r,i),r=o.left,i=o.right,s.pbox[t]=r,s.pbox[t+1]=i;for(let e=0;e<4;e++)for(let t=0;t<256;t+=2)o=R2(s,r,i),r=o.left,i=o.right,s.sbox[e][t]=r,s.sbox[e][t+1]=i}}},encryptBlock:function(t,e){var r=R2(H2,t[e],t[e+1]);t[e]=r.left,t[e+1]=r.right},decryptBlock:function(t,e){var r=function(e,t,r){let i=t,o=r,n;for(let t=F+1;1<t;--t)i^=e.pbox[t],o=C2(e,i)^o,n=i,i=o,o=n;return n=i,i=o,o=n,o^=e.pbox[1],{left:i^=e.pbox[0],right:o}}(H2,t[e],t[e+1]);t[e]=r.left,t[e+1]=r.right},blockSize:2,keySize:4,ivSize:2}),P.Blowfish=w._createHelper(p)}return i});