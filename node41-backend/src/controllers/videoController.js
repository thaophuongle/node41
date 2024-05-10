const getVideo = (req, res) => {
  connect.query("SELECT * FROM video", (err, result) => {
    res.send(result); // []
  });
};

const createVideo = (req, res) => {};

export { getVideo, createVideo };
