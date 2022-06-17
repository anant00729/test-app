// express ---> api
// pg ----> database - nodejs -- front (html/css/js  -- ejs)
// path ----> __dirname --- nodejs - code lib
const { Pool } = require('pg')
const express = require('express')
const path = require('path')


var pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:123123123@localhost:5432/cmpt276"
})

const app = express()

const PORT = process.env.PORT || 5001

// activates staic files
app.use(express.static(path.join(__dirname, 'public')))

// activates ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', async (req,res)=> {
  var get_all_students_q = "SELECT * FROM student";
    try{

        const result = await pool.query(get_all_students_q)
        const all_students = {
          student_list: result.rows,
          student_count: result.rowCount
        }

        // res.json({"ytest" : all_students.student_list[0]})
        const a_lot_of_data = []
        for(let i = 0; i < 20; ++i){
        //   console.log('all_students[i % all_students.length]', all_students.student_list[i % all_students.student_list.length])
        //   // all_students.length
        //   // 0 % 2 0
        //   // 1 % 2 1
        //   // 2 % 2 0
        //   // 3 % 2 1
        //   // 4 % 2 0
        //   // 5 % 2 1
        //   // 0 0 
        //   // 1 1
        //   // 2 0 
        //   // 3 1
        //   // 4 0 
        //   // 5 1

          const some_data = {
            ...all_students.student_list[i % all_students.student_list.length],
            index: i
          }
          a_lot_of_data.push(some_data)
        }
        // res.json(a_lot_of_data)
        all_students.student_list =  a_lot_of_data
        const ejsRes = { 
          sample_text: 'hello all sakhdfksdjfdskfh kjsdhfskdfhskj',
          all_students
        }
      
        res.render('pages/index.ejs', ejsRes)
        // // res.json(all_students)
        // res.render('pages/index.ejs', ejsRes)
    }
    catch (error) {
        res.end(error)
    }
})

app.get('/test', async (req,res)=> {
  res.render('pages/index.ejs')
})

app.listen(PORT, () => {
  console.log(`my server is running on port ${PORT}`)
})


