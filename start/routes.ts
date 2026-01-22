import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

import UsersController from '#controllers/users_controller'
import SessionController from '#controllers/session_controller'
import ProfissionalController from '#controllers/profissional_controller'
import DisponibilidadesController from '#controllers/disponibilidade_controller'
import ConsultasController from '#controllers/consulta_controller'


router.post('auth/register', [UsersController, 'store'])
router.post('auth/login', [SessionController, 'login'])

router
  .group(() => {
    router.resource('/profissional', ProfissionalController).apiOnly()
    router.resource('/disponibilidade', DisponibilidadesController).apiOnly()
    router.resource('/consulta', ConsultasController).apiOnly()
  })
  .use(middleware.auth())