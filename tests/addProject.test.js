const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../backend/server'); // Nå importerer vi bare appen, ikke serveren

describe('POST /api/projects', () => {
  it('should successfully create a new project with image', async () => {
    const formData = new FormData();
    formData.append('title', 'Test Prosjekt');
    formData.append('description', 'Dette er et testprosjekt');
    formData.append('keywords', 'Solkraft, Vindkraft');
    formData.append('visibleOnWebsite', 'yes');
    formData.append('sections', JSON.stringify([{ subtitle: 'Intro', text: 'Test prosjekt beskrivelse' }]));
    
    // Legg til bilde
    formData.append('image', fs.createReadStream(path.join(__dirname, 'testImage.jpg')));

    const response = await request(app)
      .post('/api/projects')
      .set('Content-Type', 'multipart/form-data')
      .send(formData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Prosjekt');
  });

  it('should return error if the image is missing', async () => {
    const formData = new FormData();
    formData.append('title', 'Test Prosjekt uten bilde');
    formData.append('description', 'Dette prosjektet mangler bilde.');

    const response = await request(app)
      .post('/api/projects')
      .set('Content-Type', 'multipart/form-data')
      .send(formData);

    expect(response.status).toBe(400); // Eller hvilken status du forventer for feil
    expect(response.body.message).toBe('Bilde er påkrevd');
  });
});
