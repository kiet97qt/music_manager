const request = require("supertest")
const app = require("../app");
mongoose = require('mongoose');
const SongMiddleware = require("../middlewares/SongMiddleware");
require('dotenv')

describe('Song Test', function() {
    before(function(done) {
        let attributes = {
            name: "Whistle",
            singer: "Florida",
            genre: "Pop Ballad",
            link: "https://youtube.com/whistle",
            additional: "additional..."
        }
        SongMiddleware.createSong(attributes).then((createdSong) => {
            process.env.songId = createdSong.data._id;
            done() 
        })       
    });

    describe('Creating Song', function() {
        it('Should create Song successfully', function(done) {
        let attributes = {
            name: "Whistle-1",
            singer: "Florida",
            genre: "Pop Ballad",
            link: "https://youtube.com/whistle",
            additional: "additional..."
        }
          request(app)
            .post('/song')
            .send(attributes)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done);
        });

    }); 
    
    describe('Reading Song', function() {
        it('Should get all Songs created', function(done) {
          request(app)
            .get('/song')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });

        it('Should get Song created by ID', function(done) {
            request(app)
              .get(`/song/songId/${process.env.songId}`)
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                return done();
              });
        });

        it('Should not get an existed Song', function(done) {
            request(app)
              .get(`/song/songId/61288187d75244111ac5212f`)
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(404)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                return done();
              });
        });
    });

    describe('Updating Song', function() {
         it('Should update Song successfully', function(done) {
            let attributesModified = {
                name: "Whistle-1",
                singer: "Floridaaaa",
                genre: "Pop Ballad",
                link: "https://youtube.com/whistle",
                additional: "additional..."
            }
            request(app)
                .put(`/song/songId/${process.env.songId}`)
                .send(attributesModified)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('Should update Song unsuccessfully with unexisted ID', function(done) {
            let attributesModified = {
                name: "Whistle-1",
                singer: "Floridaaaa",
                genre: "Pop Ballad",
                link: "https://youtube.com/whistle",
                additional: "additional..."
            }
            request(app)
                .put(`/song/songId/61288187d75244111ac5212f`)
                .send(attributesModified)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });

    }); 

    describe('Deleting Song', function() {
        it('Should delete Song by Id successfully', function(done) {
           request(app)
               .delete(`/song/songId/${process.env.songId}`)
               .set('Accept', 'application/json')
               .expect('Content-Type', /json/)
               .expect(200, done);
       });

       it('Should not delete Song by Id successfully with unexisted ID', function(done) {
        request(app)
            .delete(`/song/songId/${process.env.songId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
        });

        it('Should delete Mul Songs by Ids successfully', function(done) {
            let attributes = {
                name: "Whistle",
                singer: "Florida",
                genre: "Pop Ballad",
                link: "https://youtube.com/whistle",
                additional: "additional..."
            }
            SongMiddleware.createSong(attributes).then((createdSong) => {
                request(app)
                .delete(`/song`)
                .send({
                    ids:[createdSong.data.id]
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            })  
        });

        it('Should not delete Mul Songs with unexisted IDs', function(done) {
            request(app)
            .delete(`/song`)
            .send({
                ids:["61288187d75244111ac5212f"]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
        });

   });     

    after(function (done) {        
        done();    
    });
});
