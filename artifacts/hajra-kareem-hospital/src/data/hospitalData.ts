/**
 * Hajra Kareem Hospital content source.
 * Update names, timings, services and contact details here without changing layout code.
 */

export const hospitalData = {
  name: 'Hajra Kareem Hospital',
  tagline: 'Care • Compassion • Cure',
  address: '186-D, Batala Colony, Babar Chowk, Faisalabad, Pakistan',
  landline: '0418500586',
  whatsapp: '03008655277',
  directionsUrl: 'https://maps.app.goo.gl/kJZcbwz45EFpeb9VA',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.5608661186016!2d73.09832297577883!3d31.39866985314452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392267e2684a29f1%3A0x61169ea436934787!2sHajrah%20Kareem%20Hospital!5e0!3m2!1sen!2s!4v1790462487336!5m2!1sen!2s',
  emergencyNotice: 'Emergency and Gynecology services are available 24 hours a day.',
};

// General services shown in the Services section.
export const generalServices = [
  'Major and minor operations',
  'Normal delivery',
  'Appendix surgery',
  'Hernia surgery',
  'Tonsil surgery',
  'Family planning consultation',
  'Child circumcision (modern methods)',
];

// Cosmetic gynecology services shown in the separate specialist section.
export const cosmeticServices = [
  'Vaginal Rejuvenation',
  'Vaginal Tightening',
  'Stretch Marks Reduction',
  'Hymenoplasty',
  'Labiaplasty',
  'Vaginoplasty',
  'PRP Therapy',
];

// Doctor directory. Keep timings exactly as supplied; blank means no timing is displayed.
export const doctors = [
  { name: 'Dr. Hooria Ali', qualification: 'MBBS, FCPS (II)', specialty: 'General Surgeon', timing: '8pm to 8am, Sunday off' },
  { name: 'Dr. Ramsha Zulfiqar', qualification: 'MBBS (Pb.), FCPS (Pak)', specialty: 'Gynecologist and Obstetrics/Fertility Specialist', timing: '4pm to 6pm, Sunday off' },
  { name: 'Dr. Adnan Sarwar', qualification: 'MBBS, FCPS', specialty: 'Medicine Specialist', timing: '9:30pm to 12:30am, Sunday off' },
  { name: 'Dr. Sara Ramzan', qualification: 'MBBS (Pb.), FCPS (Pak)', specialty: 'Gynecologist and Obstetrics/Fertility Specialist', timing: '7pm to 9:30pm, Sunday off' },
  { name: 'Dr. Wasif Iqbal', qualification: 'MBBS, FCPS', specialty: 'Pediatrician, Children & Newborn Specialist', timing: '6:30pm to 9:30pm, Sunday off' },
  { name: 'Dr. Huma', qualification: 'MBBS, FCPS', specialty: 'Medicine Specialist', timing: '5:30pm to 6:30pm, Sunday off' },
  { name: 'Dr. Nayyara Hussain', qualification: 'MBBS, RMP', specialty: 'Gynecologist, Women & Child Diseases Specialist', timing: '8am to 2pm, Friday off' },
  { name: 'Dr. Saqib Sheikh', qualification: 'MBBS, FCPS (R) Med', specialty: 'Family Physician', timing: '2pm to 8pm, Sunday off' },
  { name: 'Dr. Danish Hassnain', qualification: 'MBBS, FCPS', specialty: 'ENT Specialist', timing: '8pm to 11pm, Sunday off' },
  { name: 'Dr. Irfan Rasheed', qualification: 'MBBS, RMP', specialty: '', timing: '8pm to 8am, Sunday off' },
  { name: 'Dr. Fahad Pervaiz', qualification: 'MBBS (QAMC), MS (Neurosurgery)', specialty: 'Neurosurgeon', timing: '7:30pm to 10:30pm, Sunday off' },
  { name: 'Dr. Ayesha Mukhtar', qualification: 'MBBS, FCPS', specialty: "Pediatrician, Children's Diseases Specialist", timing: '' },
];

export const facilities = [
  'CTG machine',
  'Doppler ultrasound machine',
  'Modern operation theater',
  'Sterilization system',
  'Clinical laboratory',
  'Labor room',
  'Private rooms',
];
