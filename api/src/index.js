import db from './db.js';
import express from 'express'
import cors from 'cors'
import sequelize from 'sequelize';
const Op = sequelize.Op;

const app = express();
app.use(cors());
app.use(express.json());


app.get('/matricula', async (req, resp) => {
    try {
        let alunos = await db.tb_matricula.findAll({ order: [['id_matricula', 'desc']] });
        resp.send(alunos);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/matricula', async (req, resp) => {
    try {
        let { nome, chamada, curso, turma } = req.body;

        if (!validarCampos(req.body, resp)) return;
        if (!(await validarDuplicidade(req.body, resp))) return;


        let r = await db.tb_matricula.create({
            nm_aluno: nome,
            nr_chamada: chamada,
            nm_curso: curso,
            nm_turma: turma
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.put('/matricula/:id', async (req, resp) => {
    try {
        let { nome, chamada, curso, turma } = req.body;
        let { id } = req.params;
  
        if (!validarCampos(req.body, resp)) return;
        if (!(await validarDuplicidade(req.body, resp, id))) return;

        await db.tb_matricula.update(
            {
                nm_aluno: nome,
                nr_chamada: chamada,
                nm_curso: curso,
                nm_turma: turma
            },
            {
                where: { id_matricula: id }
            }
        )
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.delete('/matricula/:id', async (req, resp) => {
    try {
        let { id } = req.params;

        await db.tb_matricula.destroy({ where: { id_matricula: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


async function validarDuplicidade(aluno, resp, id) {
    id = id || 0;

    let alunos = await db.tb_matricula.findAll({
        where: {
            nr_chamada: aluno.chamada,
            nm_turma: aluno.turma,
            id_matricula: { [Op.ne]: id }
        }
    });

    if (alunos.length > 0) {
        resp.send({ erro: 'Esse número de chamada já está cadastrado para essa turma.' });
        return false;
    }
    return true;
}


function validarCampos(aluno, resp) {
    if (!aluno.nome || aluno.nome.length <= 3) {
        resp.send({ erro: 'Nome do aluno deve ter mais que 4 caracteres.' });
        return false;
    }

    if (!aluno.turma || aluno.turma.length <= 3) {
        resp.send({ erro: 'Turma deve ter mais que 4 caracteres.' });
        return false;
    }

    if (!aluno.curso || aluno.curso.length <= 3) {
        resp.send({ erro: 'Curso deve ter mais que 4 caracteres.' });
        return false;
    }

    if (isNaN(aluno.chamada) || aluno.chamada <= 0) {
        resp.send({ erro: 'Chamada deve ser maior que 0.' });
        return false;
    }
    
    return true;
}



app.listen(process.env.PORT, x => console.log(`Server up at port ${process.env.PORT}`))