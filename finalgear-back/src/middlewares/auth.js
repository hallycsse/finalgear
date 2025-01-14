// import jsonwebtoken from "jsonwebtoken"
// import config from "../config.js"

// const auth = (req, res, next) => {
//   const {
//     headers: { authorization = "" },
//   } = req

//   const jwt = authorization.slice(7)

//   try {
//     const payload = jsonwebtoken.verify(jwt, config.security.jwt.secret)

//     req.session = payload

//     next()
//   } catch (err) {
//     if (err instanceof jsonwebtoken.JsonWebTokenError) {
//       res.status(403).send({ error: ["Forbidden."] })

//       return
//     }

//     res.status(500).send({ error: ["Oops, Something went wrong."] })
//   }
// }

// export default auth

import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"
import hasAccess from "../utils/hasAccess.js"

const auth = (role) => (req, res, next) => {
  const {
    headers: { authorization = "" },
  } = req

  const jwt = authorization.slice(7)

  try {
    const payload = jsonwebtoken.verify(jwt, config.security.jwt.secret)

    req.session = payload.session

    if (role) {
      hasAccess(req.session, role)
    }

    next()
  } catch (err) {
    if (err instanceof jsonwebtoken.JsonWebTokenError) {
      res.status(403).send({ error: ["Forbidden."] })
      return
    }

    res.status(500).send({ error: ["Oops, Something went wrong."] })
  }
}

export default auth
