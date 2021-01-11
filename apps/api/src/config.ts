export const config = {
  logLevel: 'debug',
  port: 3000,
  mongodb: {
    url: 'mongodb://localhost:27017',
    dbName: 'onlycats',
  },
  bucket: 'onlycats',
  stripe: {
    public:
      'pk_test_51I7e7wD7Sa3YruCw2wcaAHQdfpqL9Ans4AYT3yky0Gj4FuSD6oEYr6JxVFhonieqZ3y476acTam0rfFP5XBDuPN1000ocqQb9O',
    secret:
      'sk_test_51I7e7wD7Sa3YruCwR9NwVziLuNmemOsR72aMxr8img2cKsAxczfqPpo4iQuxBna5q5iTHSzraACh81T8EpwtY6oC00f5Ims3Ob',
  },
};
