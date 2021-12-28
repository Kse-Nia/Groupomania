const {
    sign,
    verify
} = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign({
            username: user.username,
            id: user.id
        },
        "jwtsecretplschange"
    );
    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken)
        return res.status(401).json({
            error: "User not Authenticated!"
        });

    try {
        const validToken = verify(accessToken, "jwtsecretplschange");
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(401).json({
            error: err
        });
    }
};

module.exports = {
    createTokens,
    validateToken
};
/* 

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }; */