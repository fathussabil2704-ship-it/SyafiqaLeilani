// --- DATABASE FOTO SLIDESHOW (Udah ada 6 Foto) ---
const slideshowData = [
    { src: 'Poto 1.jpeg', text: 'Cie masih malu-malu' },
    { src:  'Poto 2.jpeg', text: 'WKWKWKWK MOMENT TERKOCAK MASUK UPNVJ PARKIR' },
    { src: 'Poto 3.jpeg', text: 'YEAYYYY PHOTOBOOTH TERLUCUUUU WKWKWK KAKU BANGET' },
    { src: 'Poto 7.jpeg', text: 'Foto imuttt after jalan-jalan sore' },
    { src: 'Poto 6 Print.jpeg', text: 'Lucuuuuu banetttt nemenin print dan ngejar pak andhika WKWKW' },
    { src: 'Poto 8.jpeg', text: 'Imutttt lagi antre pucok' }
];

const welcomeScreen = document.getElementById('welcome-screen');
const startBtn = document.getElementById('start-btn');
const envelopeWrapper = document.getElementById('envelope');
const screen1 = document.getElementById('screen-1');
const screenStory = document.getElementById('screen-story');
const storyLetter = document.getElementById('story-letter');
const storyPhoto = document.getElementById('story-photo');
const screen2 = document.getElementById('screen-2');
const bgm = document.getElementById('bgm');

const btnToPhoto = document.getElementById('btn-to-photo');
const btnNextPhoto = document.getElementById('btn-next-photo');
const slideshowImg = document.getElementById('slideshow-img');
const slideshowText = document.getElementById('slideshow-text');

// Variabel untuk WhatsApp
const btnWhatsapp = document.getElementById('btn-whatsapp');
const replyMessage = document.getElementById('reply-message');

let isOpened = false;
let currentSlide = 0;
const flowers = ['🌸', '💖', '✨', '🎈', '🎉', '🌷', '🎂', '🎊'];

// 1. EFEK KURSOR
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) {
        const heart = document.createElement('div');
        heart.className = 'cursor-trail';
        heart.style.left = `${e.pageX}px`;
        heart.style.top = `${e.pageY}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
});

// 2. WELCOME SCREEN
startBtn.addEventListener('click', () => {
    bgm.play().catch(e => console.log("Audio error:", e));
    welcomeScreen.style.opacity = '0';
    setTimeout(() => welcomeScreen.style.display = 'none', 800);
});

// 3. BUKA AMPLOP -> MASUK KE STORY MODE
envelopeWrapper.addEventListener('click', () => {
    if (isOpened) return; 
    isOpened = true;

    envelopeWrapper.classList.add('open');
    createFlowerExplosion();

    // Pindah ke Screen Story (Surat)
    setTimeout(() => {
        screen1.style.opacity = '0'; // Amplop perlahan ngilang
        
        setTimeout(() => {
            screen1.classList.add('hidden');
            screenStory.classList.remove('hidden'); // Munculin background story
            
            // Beri jeda 100ms agar browser render background dulu, baru suratnya meluncur
            setTimeout(() => {
                screenStory.style.opacity = '1'; 
                storyLetter.classList.add('active'); // Memicu animasi CSS mulus
            }, 100);
            
        }, 1000); 
    }, 4000); 
});

// 4. TOMBOL "LANJUT" DARI SURAT -> FOTO PERTAMA
btnToPhoto.addEventListener('click', () => {
    storyLetter.classList.remove('active'); // Surat ngilang mulus
    
    setTimeout(() => {
        // Setup foto pertama pas layar lagi kosong
        slideshowImg.src = slideshowData[currentSlide].src;
        slideshowText.innerText = slideshowData[currentSlide].text;
        
        // Foto muncul meluncur
        storyPhoto.classList.add('active');
    }, 800); // Waktu 800ms ini nunggu animasi surat bener-bener hilang
});

// 5. TOMBOL "SELANJUTNYA" (6 FOTO) -> LAYAR UTAMA
btnNextPhoto.addEventListener('click', () => {
    storyPhoto.classList.remove('active'); // Foto saat ini ngilang mulus
    
    setTimeout(() => {
        currentSlide++;
        
        if (currentSlide < slideshowData.length) {
            // Setup dan munculin foto berikutnya
            slideshowImg.src = slideshowData[currentSlide].src;
            slideshowText.innerText = slideshowData[currentSlide].text;
            storyPhoto.classList.add('active');
        } else {
            // Kalau foto habis, transisi ke layar paling akhir
            screenStory.style.opacity = '0';
            setTimeout(() => {
                screenStory.classList.add('hidden');
                screen2.classList.remove('hidden');
                document.body.style.overflowY = 'auto'; 
                
                // Memicu layar 2 muncul mulus
                setTimeout(() => {
                    screen2.style.opacity = '1';
                    observeMemories();
                }, 100);
            }, 1000);
        }
    }, 800);
});

// 6. FUNGSI WHATSAPP
btnWhatsapp.addEventListener('click', () => {
    const textValue = replyMessage.value.trim();
    if (textValue === '') {
        alert('Isi dulu dong pesannya buat aku! 🥺');
        return;
    }
    
    // GANTI NOMOR INI JADI NOMOR WA LU (Awali dengan 62)
    const phoneNumber = '6285775152819'; 
    
    // Encode teks biar bisa dibaca sama format URL WhatsApp
    const encodedText = encodeURIComponent(textValue);
    const waLink = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // Buka tab baru ke WhatsApp
    window.open(waLink, '_blank');
});

// 7. LEDAKAN BUNGA
function createFlowerExplosion() {
    for (let i = 0; i < 80; i++) {
        const flower = document.createElement('div');
        flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        flower.className = 'flower';
        document.body.appendChild(flower);
        const angle = Math.random() * Math.PI * 2; 
        const velocity = 150 + Math.random() * 600; 
        flower.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
        flower.style.setProperty('--ty', `${Math.sin(angle) * velocity}px`);
        setTimeout(() => flower.remove(), 2500);
    }
}

// 8. ANIMASI SCROLL SCREEN 2
function observeMemories() {
    // Tambahin .reply-box-wrapper biar kotak WA ikutan muncul pake animasi
    const animatedElements = document.querySelectorAll('.polaroid, .floral-letter-wrapper, .reply-box-wrapper');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => observer.observe(el));
}