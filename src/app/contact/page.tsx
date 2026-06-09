'use client';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 px-4 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-display font-extrabold tracking-tight">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you are a hospital looking to integrate MediVault, or a patient needing support, our team is here for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            className="glass-panel p-8 rounded-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input type="text" required className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input type="email" required className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea required rows={5} className="w-full p-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all">
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-lg">Phone Support</h4>
                <p className="text-muted-foreground text-sm mt-1">+234 (0) 800 MEDIVAULT</p>
                <p className="text-muted-foreground text-sm">Mon-Fri, 9am - 5pm WAT</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <h4 className="font-bold text-lg">Email Us</h4>
                <p className="text-muted-foreground text-sm mt-1">support@medivault.ng</p>
                <p className="text-muted-foreground text-sm">partnerships@medivault.ng</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-full text-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <h4 className="font-bold text-lg">Office Location</h4>
                <p className="text-muted-foreground text-sm mt-1">12 Innovation Drive, Yaba, Lagos, Nigeria.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}