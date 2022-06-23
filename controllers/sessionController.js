exports.getSessionData = (req, res) => {
  const { sessionKey } = req.query;
  res.json(req.session[sessionKey]);
};

exports.getAllSessionData = (req, res) => {
  res.json(req.session);
};

exports.setSessionData = (req, res) => {
  const { data, sessionKey } = req.body;

  req.session[sessionKey] = data;
  res.json({ message: 'successfully added to session' });
};
