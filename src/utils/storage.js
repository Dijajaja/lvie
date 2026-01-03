// Gestion du stockage local
const STORAGE_KEYS = {
  EVENTS: 'love_story_events',
  QUIZZES: 'love_story_quizzes',
  QUIZ_ATTEMPTS: 'love_story_quiz_attempts',
  SETTINGS: 'love_story_settings',
  SURPRISES: 'love_story_surprises',
  ORIGIN: 'love_story_origin',
  PERSONAL_INFO: 'love_story_personal_info',
};

export const storage = {
  // Événements
  getEvents: () => {
    const events = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return events ? JSON.parse(events) : [];
  },
  
  saveEvents: (events) => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  },
  
  addEvent: (event) => {
    const events = storage.getEvents();
    const newEvent = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    events.push(newEvent);
    storage.saveEvents(events);
    return newEvent;
  },
  
  updateEvent: (id, updates) => {
    const events = storage.getEvents();
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...updates };
      storage.saveEvents(events);
      return events[index];
    }
    return null;
  },
  
  deleteEvent: (id) => {
    const events = storage.getEvents();
    const filtered = events.filter(e => e.id !== id);
    storage.saveEvents(filtered);
  },
  
  // Quiz
  getQuizzes: () => {
    const quizzes = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    return quizzes ? JSON.parse(quizzes) : [];
  },
  
  saveQuizzes: (quizzes) => {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  },
  
  addQuiz: (quiz) => {
    const quizzes = storage.getQuizzes();
    const newQuiz = {
      ...quiz,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    quizzes.push(newQuiz);
    storage.saveQuizzes(quizzes);
    return newQuiz;
  },
  
  updateQuiz: (id, updates) => {
    const quizzes = storage.getQuizzes();
    const index = quizzes.findIndex(q => q.id === id);
    if (index !== -1) {
      quizzes[index] = { ...quizzes[index], ...updates };
      storage.saveQuizzes(quizzes);
      return quizzes[index];
    }
    return null;
  },
  
  deleteQuiz: (id) => {
    const quizzes = storage.getQuizzes();
    const filtered = quizzes.filter(q => q.id !== id);
    storage.saveQuizzes(filtered);
  },
  
  // Tentatives de quiz
  getQuizAttempts: () => {
    const attempts = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
    return attempts ? JSON.parse(attempts) : {};
  },
  
  saveQuizAttempt: (quizId, score, answers) => {
    const attempts = storage.getQuizAttempts();
    attempts[quizId] = {
      score,
      answers,
      date: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(attempts));
  },
  
  getQuizAttempt: (quizId) => {
    const attempts = storage.getQuizAttempts();
    return attempts[quizId] || null;
  },
  
  // Surprises
  getSurprises: () => {
    const surprises = localStorage.getItem(STORAGE_KEYS.SURPRISES);
    return surprises ? JSON.parse(surprises) : [];
  },
  
  saveSurprises: (surprises) => {
    localStorage.setItem(STORAGE_KEYS.SURPRISES, JSON.stringify(surprises));
  },
  
  addSurprise: (surprise) => {
    const surprises = storage.getSurprises();
    const newSurprise = {
      ...surprise,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      revealed: false,
    };
    surprises.push(newSurprise);
    storage.saveSurprises(surprises);
    return newSurprise;
  },
  
  revealSurprise: (id) => {
    const surprises = storage.getSurprises();
    const index = surprises.findIndex(s => s.id === id);
    if (index !== -1) {
      surprises[index].revealed = true;
      surprises[index].revealedAt = new Date().toISOString();
      storage.saveSurprises(surprises);
      return surprises[index];
    }
    return null;
  },
  
  // Paramètres
  getSettings: () => {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : {
      theme: 'light',
      names: { person1: 'Lui', person2: 'Elle' },
    };
  },
  
  saveSettings: (settings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // Origine de la relation
  getOrigin: () => {
    const origin = localStorage.getItem(STORAGE_KEYS.ORIGIN);
    return origin ? JSON.parse(origin) : null;
  },

  saveOrigin: (origin) => {
    localStorage.setItem(STORAGE_KEYS.ORIGIN, JSON.stringify(origin));
  },

  // Infos personnelles
  getPersonalInfo: () => {
    const info = localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO);
    return info ? JSON.parse(info) : {
      person1: {},
      person2: {},
    };
  },

  savePersonalInfo: (info) => {
    localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(info));
  },

  // Export/Import des données
  exportAllData: () => {
    return {
      events: storage.getEvents(),
      quizzes: storage.getQuizzes(),
      surprises: storage.getSurprises(),
      settings: storage.getSettings(),
      origin: storage.getOrigin(),
      personalInfo: storage.getPersonalInfo(),
      quizAttempts: storage.getQuizAttempts(),
      exportDate: new Date().toISOString(),
      version: '1.0',
    };
  },

  importAllData: (data, merge = false) => {
    try {
      if (merge) {
        // Fusionner les données
        const existingEvents = storage.getEvents();
        const existingQuizzes = storage.getQuizzes();
        const existingSurprises = storage.getSurprises();
        
        // Fusionner les événements (éviter les doublons par ID)
        if (data.events) {
          const mergedEvents = [...existingEvents];
          data.events.forEach(event => {
            if (!mergedEvents.find(e => e.id === event.id)) {
              mergedEvents.push(event);
            }
          });
          storage.saveEvents(mergedEvents);
        }

        // Fusionner les quiz
        if (data.quizzes) {
          const mergedQuizzes = [...existingQuizzes];
          data.quizzes.forEach(quiz => {
            if (!mergedQuizzes.find(q => q.id === quiz.id)) {
              mergedQuizzes.push(quiz);
            }
          });
          storage.saveQuizzes(mergedQuizzes);
        }

        // Fusionner les surprises
        if (data.surprises) {
          const mergedSurprises = [...existingSurprises];
          data.surprises.forEach(surprise => {
            if (!mergedSurprises.find(s => s.id === surprise.id)) {
              mergedSurprises.push(surprise);
            }
          });
          storage.saveSurprises(mergedSurprises);
        }

        // Les paramètres et infos personnelles sont remplacés (pas fusionnés)
        if (data.settings) {
          storage.saveSettings(data.settings);
        }
        if (data.origin) {
          storage.saveOrigin(data.origin);
        }
        if (data.personalInfo) {
          storage.savePersonalInfo(data.personalInfo);
        }
      } else {
        // Remplacer toutes les données
        if (data.events) storage.saveEvents(data.events);
        if (data.quizzes) storage.saveQuizzes(data.quizzes);
        if (data.surprises) storage.saveSurprises(data.surprises);
        if (data.settings) storage.saveSettings(data.settings);
        if (data.origin) storage.saveOrigin(data.origin);
        if (data.personalInfo) storage.savePersonalInfo(data.personalInfo);
        if (data.quizAttempts) {
          localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(data.quizAttempts));
        }
      }
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      return false;
    }
  },
};

