/**
 * EmailJS Contact Form Handler for Vino Arsan
 * Works with GitHub Pages (no PHP needed)
 */

(function() {
    // Initialize EmailJS
    const EMAILJS_PUBLIC_KEY = 'VwLLvRR2zKudMSM-u';
    const EMAILJS_SERVICE_ID = 'service_7wqkzaf';
    const EMAILJS_TEMPLATE_ID = 'template_i3yilwv';

    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_PUBLIC_KEY);

    const contactForm = document.getElementById('contactForm');
    const formMessages = document.getElementById('formMessages');
    const submitBtn = document.getElementById('submitBtn');
    const formStartTime = Date.now();

    // Function to show messages
    function showMessage(message, type) {
        if (!formMessages) return;

        formMessages.textContent = message;
        formMessages.className = 'form-messages ' + type;
        formMessages.style.display = 'block';

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessages.style.display = 'none';
            }, 5000);
        }

        // Scroll to message
        formMessages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Function to clear field errors
    function clearFieldErrors() {
        const fields = contactForm.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            field.classList.remove('error');
        });
    }

    // Anti-spam validation
    function validateAntiSpam(formData) {
        // 1. Honeypot check
        if (formData.get('website')) {
            console.log('Spam detected: honeypot filled');
            return { valid: false, message: 'Form submission failed. Please try again.' };
        }

        // 2. Time-based check (at least 3 seconds)
        const timeElapsed = (Date.now() - formStartTime) / 1000;
        if (timeElapsed < 3) {
            console.log('Spam detected: submitted too quickly');
            return { valid: false, message: 'Form submission failed. Please take your time filling out the form.' };
        }

        // 3. Check for suspicious patterns in message
        const message = formData.get('message');
        const suspiciousPatterns = [
            /\[url=/i,
            /\[link=/i,
            /<a href=/i,
            /http.*http.*http/i  // Multiple URLs
        ];

        for (const pattern of suspiciousPatterns) {
            if (pattern.test(message)) {
                console.log('Spam detected: suspicious pattern in message');
                return { valid: false, message: 'Form submission failed. Please remove any links from your message.' };
            }
        }

        return { valid: true };
    }

    // Handle form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous messages and errors
        if (formMessages) {
            formMessages.style.display = 'none';
        }
        clearFieldErrors();

        // Get form data
        const formData = new FormData(contactForm);

        // Validate anti-spam
        const validation = validateAntiSpam(formData);
        if (!validation.valid) {
            showMessage(validation.message, 'error');
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'SENDING...';

        // Map subject codes to readable text
        const subjectMap = {
            'general': 'General Inquiry',
            'bulk': 'Bulk Orders',
            'custom': 'Custom Labels',
            'seminar': 'Wine-Making Seminars',
            'product': 'Product Information',
            'other': 'Other'
        };

        // Prepare template parameters for EmailJS
        const templateParams = {
            from_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
            first_name: formData.get('firstName'),
            last_name: formData.get('lastName'),
            reply_to: formData.get('email'),
            from_email: formData.get('email'),
            phone: formData.get('phone') || 'Not provided',
            subject: subjectMap[formData.get('subject')] || formData.get('subject'),
            message: formData.get('message'),
            to_email: 'vinoarsanenterprises@gmail.com',
            submission_date: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );

            console.log('Email sent successfully:', response);

            // Show success message
            showMessage('Thank you for your message! We will get back to you soon.', 'success');

            // Reset form
            contactForm.reset();

        } catch (error) {
            console.error('Email send failed:', error);

            // Show error message
            showMessage(
                'Sorry, there was an error sending your message. Please try again or email us directly at vinoarsanenterprises@gmail.com',
                'error'
            );
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'SEND MESSAGE';
        }
    });

    // Real-time field validation - remove error class when user starts typing
    const fields = contactForm.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
            }
        });
    });
})();
