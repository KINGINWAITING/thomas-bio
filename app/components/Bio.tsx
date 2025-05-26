import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './Bio.module.css';
import { ProfilePhoto } from './ProfilePhoto';

export function Bio() {
  return (
    <section className={styles.bioContainer}>
      <div className={styles.profileSection}>
        <ProfilePhoto
          src="/thomas.jpg"
          alt="Thomas Abebe"
          size="lg"
          className={styles.fadeIn}
        />
        
        <div className={styles.textContent}>
          <h1 className={cn(styles.name, 'metallic-text', styles.fadeInUp)}>
            Thomas Abebe
          </h1>
          
          <h2 className={cn(styles.title, styles.fadeInUp, 'delay-200')}>
            Software Engineer & Entrepreneur
          </h2>
          
          <p className={cn(styles.description, styles.fadeInUp, 'delay-300')}>
            Passionate about building innovative solutions and creating impactful technology.
            Currently focused on web development, AI, and entrepreneurship.
            Brown University student with a drive for excellence in software engineering.
          </p>
          
          <div className={cn(styles.links, styles.fadeInUp, 'delay-400')}>
            <Link
              href="https://github.com/thomasabebe"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <Github size={20} />
              <span>GitHub</span>
            </Link>
            
            <Link
              href="https://linkedin.com/in/thomas-abebe"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </Link>
            
            <Link
              href="mailto:thomas_abebe@brown.edu"
              className={styles.link}
            >
              <Mail size={20} />
              <span>Email</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}