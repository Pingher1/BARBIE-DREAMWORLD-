export class SoundManager {
    private static context: AudioContext | null = null;

    private static getContext(): AudioContext {
        if (!this.context) {
            this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return this.context;
    }

    public static playTrumpetFanfare() {
        const ctx = this.getContext();
        const t = ctx.currentTime;

        // Notes for a C Major Fanfare: C4, E4, G4, C5
        const notes = [
            { freq: 261.63, start: 0, duration: 0.2 },   // C4 (da)
            { freq: 261.63, start: 0.2, duration: 0.2 }, // C4 (da)
            { freq: 261.63, start: 0.4, duration: 0.2 }, // C4 (da)
            { freq: 392.00, start: 0.6, duration: 0.6 }, // G4 (DAAA!)
            { freq: 329.63, start: 1.2, duration: 0.2 }, // E4 (da)
            { freq: 392.00, start: 1.4, duration: 0.2 }, // G4 (da)
            { freq: 523.25, start: 1.6, duration: 1.2 }, // C5 (DAAAAA!)
        ];

        notes.forEach(note => this.playTone(note.freq, t + note.start, note.duration));
    }

    private static playTone(freq: number, startTime: number, duration: number) {
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth'; // Sawtooth has a brassy quality
        osc.frequency.value = freq;

        // Envelope for "brass" attack
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05); // Attack
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration); // Decay

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    public static playClick() {
        const ctx = this.getContext();
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(400, t + 0.1);

        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
    }

    public static playTeleport() {
        const ctx = this.getContext();
        const t = ctx.currentTime;

        // 1. "Electric Beam" Hum (High pitch sine/triangle)
        const oscBeam = ctx.createOscillator();
        const gainBeam = ctx.createGain();
        oscBeam.type = 'sine';
        oscBeam.frequency.setValueAtTime(200, t);
        oscBeam.frequency.exponentialRampToValueAtTime(3000, t + 2.5); // Rising energy
        gainBeam.gain.setValueAtTime(0, t);
        gainBeam.gain.linearRampToValueAtTime(0.2, t + 1);
        gainBeam.gain.linearRampToValueAtTime(0, t + 3);

        oscBeam.connect(gainBeam);
        gainBeam.connect(ctx.destination);
        oscBeam.start(t);
        oscBeam.stop(t + 3);

        // 2. "Pixie Dust" Sparkles (Random high pitched notes)
        const playSparkle = (time: number, freq: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.1, time + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(time);
            osc.stop(time + 0.3);
        };

        // Scatter sparkles over 2.5 seconds
        for (let i = 0; i < 20; i++) {
            // Random pentatonic-ish high notes
            const freq = 1000 + Math.random() * 2000 + (Math.random() > 0.5 ? 1000 : 0);
            playSparkle(t + Math.random() * 2.5, freq);
        }

        // 3. "The Magic Poof" (Reassembly / Arrival)
        const oscPoof = ctx.createOscillator();
        const gainPoof = ctx.createGain();
        oscPoof.type = 'triangle';
        oscPoof.frequency.setValueAtTime(100, t + 2.5);
        oscPoof.frequency.exponentialRampToValueAtTime(600, t + 2.8); // Little chirpy rise
        gainPoof.gain.setValueAtTime(0, t + 2.5);
        gainPoof.gain.linearRampToValueAtTime(0.3, t + 2.6);
        gainPoof.gain.exponentialRampToValueAtTime(0.01, t + 3.5);

        oscPoof.connect(gainPoof);
        gainPoof.connect(ctx.destination);
        oscPoof.start(t + 2.5);
        oscPoof.stop(t + 3.5);
    }
    public static speakLetter(char: string) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(char.toLowerCase());
            utterance.rate = 1.2;
            utterance.pitch = 1.2;
            utterance.volume = 0.8;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        } else {
            this.playClick();
        }
    }

    public static speakWelcome(name: string) {
        if ('speechSynthesis' in window) {
            // The "Grand Event" Announcement
            const utterance = new SpeechSynthesisUtterance(`Welcome to Barbie's World, ${name}`);
            utterance.rate = 0.9; // Slower, more majestic
            utterance.pitch = 1.1; // Warm and welcoming
            utterance.volume = 1.0;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    }

    public static playSuccess() {
        const ctx = this.getContext();
        const t = ctx.currentTime;

        // Major Chord Arpeggio (Fanfare)
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t + i * 0.1);
            gain.gain.setValueAtTime(0, t + i * 0.1);
            gain.gain.linearRampToValueAtTime(0.2, t + i * 0.1 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.1 + 0.5);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t + i * 0.1);
            osc.stop(t + i * 0.1 + 0.5);
        });

        // Sparkle Burst
        for (let i = 0; i < 10; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1000 + Math.random() * 2000, t + 0.3 + Math.random() * 0.2);
            gain.gain.setValueAtTime(0.1, t + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.8);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t + 0.3);
            osc.stop(t + 0.8);
        }
    }

    public static playPop() {
        const ctx = this.getContext();
        const t = ctx.currentTime;

        // A short, high-pitched "blip"
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);
        gain.gain.setValueAtTime(0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.1);
    }
}
