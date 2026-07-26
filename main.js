document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburgerBtn');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('mobileOverlay');

    function toggleMenu() {
        drawer.classList.toggle('open');
        overlay.classList.toggle('open');
    }

    if(hamburger) hamburger.addEventListener('click', toggleMenu);
    if(overlay) overlay.addEventListener('click', toggleMenu);

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    const counters = document.querySelectorAll('.counter, .counter-suffix');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText.replace(/[^0-9]/g, '');
                        const suffix = counter.getAttribute('data-suffix') || '+';
                        const inc = target / 40;
                        
                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc) + suffix;
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };
                    updateCount();
                });
            }
        });
    }, { threshold: 0.5 });

    const metricsGrid = document.querySelector('.metrics-grid');
    if (metricsGrid) counterObserver.observe(metricsGrid);

    const fab = document.getElementById("fabToggle");
    const fabMenu = document.querySelector(".fab-menu");
    if(fab) {
        fab.addEventListener("click", () => fabMenu.classList.toggle("open"));
        document.addEventListener("click", (e) => {
            if(!fabMenu.contains(e.target)) fabMenu.classList.remove("open");
        });
    }
});

function sendWhatsApp(event){
    event.preventDefault();
    const name = document.getElementById("patientName").value;
    const phone = document.getElementById("patientPhone").value;
    const issue = document.getElementById("patientIssue").value;
    
    const message = `*Appointment Request*\n\n👤 Patient Name: ${name}\n📞 Contact Number: ${phone}\n🩺 Condition: ${issue}\n\nHello Sir,\nI would like to book a consultation at Magadh Pain & Paralysis Clinic.\nKindly let me know the available appointment time.\nThank you.`;

    window.open("https://wa.me/919199726999?text=" + encodeURIComponent(message), "_blank");
}