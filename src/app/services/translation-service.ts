import { Injectable, computed, inject } from '@angular/core';
import { LanguageService, Language } from './language-service';

// Translation data structure for multiple languages
interface Translations {
  en: Record<string, string>; // English translations
  es: Record<string, string>; // Spanish translations
}

// Service for handling translations based on current language
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly languageService = inject(LanguageService); // Language state service

  // All translation data for supported languages
  private readonly translations: Translations = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.projects': 'Projects',
      
      // Hero Section - keeping exact text
      'hero.name': 'Nicolás Aliaga',
      'hero.title': 'Software Engineer',
      
      // About Section - keeping exact text
      'about.title': 'About Me',
      'about.intro': 'Hello! I can use AI to code, but no for my own About Me. I\'m Nicolás Aliaga, a Computer Engineer who wants to create and serve to help the people reach their objectives, mainly focused on bring efficient solutions, as for my the most valuable thing is to save time to the users.',
      'about.description': 'I\'m heavily focused on web development with Angular, working on create code scalable and maintainable. My objective is to create safe, fast and responsive web applications to reach the goals of the business.',
      'about.techStack': 'Technology Stack',
      
      // Projects Section - keeping exact text
      'projects.title': 'Personal Projects',
      'projects.empty.title': 'No projects available',
      'projects.empty.description': 'Projects will appear here when loaded',
      
      // Project Details - Portfolio
      'project.portfolio.title': 'Portfolio',
      'project.portfolio.description': 'A minimalist, pixelated portfolio.',
      'project.portfolio.longDescription': 'This portfolio represents a modern approach to personal branding through web development. Built with Angular 20\'s cutting-edge features including signals, zoneless change detection, and SSR capabilities. The design embraces a retro-pixelated aesthetic while maintaining professional functionality and performance optimization.',
      'project.portfolio.feature1': 'Modern Angular 20 with Signals API',
      'project.portfolio.feature2': 'Server-Side Rendering for optimal SEO',
      'project.portfolio.feature3': 'Custom smooth scrolling with Lenis integration',
      'project.portfolio.feature4': 'Performance-optimized particle animations',
      'project.portfolio.feature5': 'Zoneless change detection for better performance',
      'project.portfolio.challenge1': 'Implementing SSR with client-side animations',
      'project.portfolio.challenge2': 'Custom scrollbar integration with Lenis',
      'project.portfolio.challenge3': 'Balancing retro aesthetics with modern UX',
      
      // Project Details - My Notex
      'project.mynotex.title': 'My Notex',
      'project.mynotex.description': 'A simple note taking application with AI chat integrated.',
      'project.mynotex.longDescription': 'My Notex is a comprehensive note-taking platform that bridges traditional note organization with AI-powered assistance. Built with a modern tech stack featuring Angular for the frontend, Node.js/Express for the backend, and TursoSQL for efficient data management. The integrated AI chat talks with the users inside the context of the note.',
      'project.mynotex.feature1': 'Real-time note editing and synchronization',
      'project.mynotex.feature2': 'Smart note categorization and tagging',
      'project.mynotex.feature3': 'Offline-first architecture with sync',
      'project.mynotex.challenge1': 'Integrating AI chat with note interface',
      'project.mynotex.challenge2': 'Implementing offline-first architecture',
      
      // Project Details - Abyss Team Request
      'project.abysstr.title': 'Abyss Team Request',
      'project.abysstr.description': 'A platform where you can sent a team request to your favorite content creator, so he can play with the user request.',
      'project.abysstr.longDescription': 'Abyss Team Request is an innovative platform designed to connect Genshin Impact communities with content creators. Users can submit team requests with a message included, providing more interaction between content creator and public. Built with Angular and Firebase, including authentication and user profiles.',
      'project.abysstr.feature1': 'Request submission system',
      'project.abysstr.feature2': 'Content creator profile management',
      'project.abysstr.feature3': 'Integrated little note system',
      'project.abysstr.challenge1': 'Implementing search user system',
      'project.abysstr.challenge2': 'Creating intuitive UX for user interactions',
      'project.abysstr.challenge3': 'Implementing authentication system with Firebase',

       // Project Details - Task API
      'project.taskapi.title': 'Task API',
      'project.taskapi.description': 'A production-ready REST API for task management with multi-user system.',
      'project.taskapi.longDescription': 'A production-ready REST API for task management that demonstrates advanced Express.js capabilities beyond basic CRUD operations. The project showcases enterprise-level patterns including JWT authentication, user-specific data isolation, and comprehensive input validation.',
      'project.taskapi.feature1': 'Multi-user system',
      'project.taskapi.feature2': 'User-scoped data',
      'project.taskapi.feature3': 'Advanced filtering',
      'project.taskapi.feature4': 'Pagination system',
      'project.taskapi.feature5': 'Comprehensive validation',
      'project.taskapi.feature6': 'Centralized error handling',
      'project.taskapi.feature7': 'Security-first approach',
      'project.taskapi.challenge1': 'Authentication Flow',
      'project.taskapi.challenge2': 'Data Isolation',
      'project.taskapi.challenge3': 'Error Handling',
      'project.taskapi.challenge4': 'Query Optimization',

      // Project Details - Library Management System
      'project.library-management-system.title': 'Library Management System',
      'project.library-management-system.description': 'A simple and complete library management system using PostgreSQL.',
      'project.library-management-system.longDescription': 'PostgreSQL-based library management system demonstrating advanced database design and SQL programming. Features normalized schema (3NF), automated workflows with triggers, stored procedures for business logic, role-based access control, and performance optimization. Includes 10 tables, complex analytical queries, and comprehensive backup strategy for efficient library operations.',
      'project.library-management-system.feature1': 'Automated workflows with triggers and 6 stored procedures',
      'project.library-management-system.feature2': 'Role-based security with 3 access levels (admin, librarian, read-only)',
      'project.library-management-system.feature3': 'Performance optimization with 8 strategic indexes and complex queries',
      'project.library-management-system.challenge1': 'Designing normalized database schema (3NF) with proper foreign key constraints',
      'project.library-management-system.challenge2': 'Implementing trigger automation for data consistency and fine generation',
      'project.library-management-system.challenge3': 'Balancing security through role-based access control with operational flexibility',
      
      // Experience Section
      'experience.title': 'Experience',
      'experience.empty.title': 'No experience data available',
      'experience.company': 'Chilevisión S.A.',
      'experience.position': 'Professional Internship',
      'experience.period': '2024 - 2024',
      'experience.description': 'I developed a website using Flask to generate reports with Excel export and user profiling. I implemented a CRUD for user and permission management, using SQL Server for queries and deploying it on IIS. I also automated the process of create a daily backup on the database, plus sending a email to the responsable.',
      
      // Card buttons
      'card.details': 'DETAILS',
      'card.code': 'CODE',
      'card.live': 'LIVE',
      'card.project': 'PROJECT',
      
      // Project detail page
      'project.detail.about': 'About this project',
      'project.detail.techStack': 'Technology Stack',
      'project.detail.features': 'Key Features',
      'project.detail.challenges': 'Development Challenges',
      'project.detail.status': 'Status',
      'project.detail.started': 'Started',
      'project.detail.backToPortfolio': 'Back to Portfolio',
      
      // Project status values
      'status.completed': 'Completed',
      'status.in-progress': 'In Progress',
      'status.planned': 'Planned',
      
      // Project detail buttons
      'project.detail.viewLive': 'VIEW LIVE',
      'project.detail.viewCode': 'VIEW CODE',
      'project.detail.viewDoc': 'VIEW DOCUMENTATION',
      
     
    },
    es: {
      // Navigation
      'nav.home': 'Inicio',
      'nav.about': 'Sobre mí',
      'nav.experience': 'Experiencia',
      'nav.projects': 'Proyectos',
      
      // Hero Section
      'hero.name': 'Nicolás Aliaga',
      'hero.title': 'Ingeniero en Informática',
      
      // About Section
      'about.title': 'Acerca de Mí',
      'about.intro': '¡Hola! Podré usar IA para programar, pero no para mi propio Sobre mí. Soy Nicolás Aliaga, un Ingeniero en Informática que quiere crear y servir para ayudar a las personas a alcanzar sus objetivos, principalmente enfocado en brindar soluciones eficientes, ya que para mí lo más valioso es ahorrar tiempo a los usuarios.',
      'about.description': 'Estoy muy enfocado en el desarrollo web con Angular, trabajando en crear código escalable y mantenible. Mi objetivo es crear aplicaciones web seguras, rápidas y responsivas para alcanzar los objetivos del negocio.',
      'about.techStack': 'Stack Tecnológico',
      
      // Projects Section
      'projects.title': 'Proyectos Personales',
      'projects.empty.title': 'No hay proyectos disponibles',
      'projects.empty.description': 'Los proyectos aparecerán aquí cuando se carguen',
      
      // Project Details - Portfolio
      'project.portfolio.title': 'Portfolio',
      'project.portfolio.description': 'Un portafolio minimalista y pixelado.',
      'project.portfolio.longDescription': 'Este portafolio representa un enfoque moderno del branding personal a través del desarrollo web. Construido con las características de vanguardia de Angular 20, incluyendo signals, detección de cambios sin zonas y capacidades SSR. El diseño abraza una estética retro-pixelada mientras mantiene funcionalidad profesional y optimización de rendimiento.',
      'project.portfolio.feature1': 'Angular 20 moderno con Signals API',
      'project.portfolio.feature2': 'Renderizado del lado del servidor para SEO óptimo',
      'project.portfolio.feature3': 'Desplazamiento suave personalizado con integración Lenis',
      'project.portfolio.feature4': 'Animaciones de partículas optimizadas para rendimiento',
      'project.portfolio.feature5': 'Detección de cambios sin zona para mejor rendimiento',
      'project.portfolio.challenge1': 'Implementar SSR con animaciones del lado del cliente',
      'project.portfolio.challenge2': 'Integración personalizada de barra de desplazamiento con Lenis',
      'project.portfolio.challenge3': 'Equilibrar estética retro con UX moderno',
      
      // Project Details - My Notex
      'project.mynotex.title': 'My Notex',
      'project.mynotex.description': 'Una aplicación simple de toma de notas con chat de IA integrado.',
      'project.mynotex.longDescription': 'My Notex es una plataforma integral de toma de notas que conecta la organización tradicional de notas con asistencia impulsada por IA. Construida con un stack tecnológico moderno que incluye Angular para el frontend, Node.js/Express para el backend, y TursoSQL para gestión eficiente de datos. El chat de IA integrado conversa con los usuarios dentro del contexto de la nota.',
      'project.mynotex.feature1': 'Edición y sincronización de notas en tiempo real',
      'project.mynotex.feature2': 'Categorización inteligente de notas y etiquetado',
      'project.mynotex.feature3': 'Arquitectura offline-first con sincronización',
      'project.mynotex.challenge1': 'Integrar chat de IA con la interfaz de notas',
      'project.mynotex.challenge2': 'Implementar arquitectura offline-first',
      
      // Project Details - Abyss Team Request
      'project.abysstr.title': 'Abyss Team Request',
      'project.abysstr.description': 'Una plataforma donde puedes enviar una solicitud de equipo a tu creador de contenido favorito, para que pueda jugar con eso.',
      'project.abysstr.longDescription': 'Abyss Team Request es una plataforma innovadora diseñada para conectar comunidades de Genshin Impact con creadores de contenido. Los usuarios pueden enviar solicitudes de equipo con un mensaje incluido, proporcionando más interacción entre creador de contenido y público. Construida con Angular y Firebase, incluyendo autenticación y perfiles de usuario.',
      'project.abysstr.feature1': 'Sistema de envío de solicitudes',
      'project.abysstr.feature2': 'Gestión de perfiles de creadores de contenido',
      'project.abysstr.feature3': 'Sistema de notas pequeñas integrado',
      'project.abysstr.challenge1': 'Implementar sistema de búsqueda de usuarios',
      'project.abysstr.challenge2': 'Crear UX intuitiva para interacciones de usuario',
      'project.abysstr.challenge3': 'Implementar sistema de autenticación con Firebase',

      // Project Details - Task API
      'project.taskapi.title': 'Task API',
      'project.taskapi.description': 'Una API REST lista para producción para gestión de tareas con sistema multi-usuario.',
      'project.taskapi.longDescription': 'Una API REST lista para producción para gestión de tareas que demuestra capacidades avanzadas de Express.js más allá de operaciones CRUD básicas. El proyecto muestra patrones de nivel empresarial incluyendo autenticación JWT, aislamiento de datos específicos del usuario y validación integral.',
      'project.taskapi.feature1': 'Sistema multi-usuario',
      'project.taskapi.feature2': 'Datos con alcance de usuario',
      'project.taskapi.feature3': 'Filtrado avanzado',
      'project.taskapi.feature4': 'Sistema de paginación',
      'project.taskapi.feature5': 'Validación integral',
      'project.taskapi.feature6': 'Manejo centralizado de errores',
      'project.taskapi.feature7': 'Enfoque de seguridad primero',
      'project.taskapi.challenge1': 'Flujo de Autenticación',
      'project.taskapi.challenge2': 'Aislamiento de Datos',
      'project.taskapi.challenge3': 'Manejo de Errores',
      'project.taskapi.challenge4': 'Optimización de Consultas',

      // Project Details - Library Management System
      'project.library-management-system.title': 'Sistema de Gestión de Bibliotecas',
      'project.library-management-system.description': 'Un sistema simple y completo de gestión de bibliotecas usando PostgreSQL.',
      'project.library-management-system.longDescription': 'Sistema de gestión de bibliotecas basado en PostgreSQL que demuestra diseño avanzado de bases de datos y programación SQL. Incluye esquema normalizado (3NF), flujos de trabajo automatizados con triggers, procedimientos almacenados para lógica de negocio, control de acceso basado en roles y optimización de rendimiento. Incluye 10 tablas, consultas analíticas complejas y estrategia integral de respaldo para operaciones eficientes de la biblioteca.',
      'project.library-management-system.feature1': 'Flujos de trabajo automatizados con triggers y 6 procedimientos almacenados',
      'project.library-management-system.feature2': 'Control de acceso basado en roles',
      'project.library-management-system.feature3': 'Optimización de rendimiento',
      'project.library-management-system.challenge1': 'Diseño de esquema normalizado (3NF) con restricciones de clave foránea apropiadas',
      'project.library-management-system.challenge2': 'Implementación de flujos de trabajo automatizados con triggers',
      'project.library-management-system.challenge3': 'Ajuste de seguridad a través de control de acceso basado en roles con flexibilidad operativa',
      
      // Experience Section
      'experience.title': 'Experiencia',
      'experience.empty.title': 'No hay datos de experiencia disponibles',
      'experience.company': 'Chilevisión S.A.',
      'experience.position': 'Práctica Profesional',
      'experience.period': '2024 - 2024',
      'experience.description': 'Desarrollé un sitio web usando Flask para generar reportes con exportación a Excel y perfilado de usuarios. Implementé un CRUD para gestión de usuarios y permisos, usando SQL Server para consultas y desplegándolo en IIS. También automaticé el proceso de crear una copia de seguridad diaria en la base de datos, además de enviar un email al responsable.',
      
      // Card buttons
      'card.details': 'DETALLES',
      'card.code': 'CÓDIGO',
      'card.live': 'VER',
      'card.project': 'PROYECTO',
      
      // Project detail page
      'project.detail.about': 'Acerca de este proyecto',
      'project.detail.techStack': 'Stack Tecnológico',
      'project.detail.features': 'Características Clave',
      'project.detail.challenges': 'Desafíos de Desarrollo',
      'project.detail.status': 'Estado',
      'project.detail.started': 'Iniciado',
      'project.detail.backToPortfolio': 'Volver al Portfolio',
      
      // Project status values
      'status.completed': 'Completado',
      'status.in-progress': 'En Progreso',
      'status.planned': 'Planeado',
      
      // Project detail buttons
      'project.detail.viewLive': 'VER PROYECTO',
      'project.detail.viewCode': 'VER CÓDIGO',
      'project.detail.viewDoc': 'VER DOCUMENTACIÓN',
      
    }
  };

  // Get translations for current language
  readonly currentTranslations = computed(() => {
    const currentLang = this.languageService.currentLanguage();
    return this.translations[currentLang];
  });

  // Get translated text for given key, fallback to key if not found
  translate(key: string): string {
    const translations = this.currentTranslations();
    return translations[key] || key;
  }
}