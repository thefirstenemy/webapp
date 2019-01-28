/**
 * @author Fabio Santos <fabioprogramadorti@gmail.com>
 */

const app = require('express')();
const mysql = require('mysql');

const bodyParser = require('body-parser');



app.use(
    function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    },
    bodyParser.json({limit: '8mb'})

); // support json encoded bodies


  

// environment variables
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

// mysql credentials
const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST || '172.17.0.2',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'users'
});


connection.connect((err) => {
	if (err) {
		console.error('error connecting mysql: ', err);
	} else {
		console.log('mysql connection successful');
		app.listen(PORT, HOST, (err) => {
			if (err) {
				console.error('Error starting  server', err);
			} else {
				console.log('server listening at port ' + PORT);
			}
		});
	}
});

// home page
app.get('/', (req, res) => {
	res.json({
		success: true,
		message: 'success connection'
	});
});

/**
 * @author Santos M. Fabio 
 * @date  26/01/2019
 * @see List user list by sql query
 * @return json 
 */
app.get('/get-users', (req, res)=>{
    connection.query('SELECT u.id, u.name, u.serial_number, u.position, u.email, u.status \
    FROM users as u', (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});


/**
 * @author Santos M. Fabio 
 * @date  26/01/2019
 * @see Post password and email to login
 * @return bool 
 */
app.post('/login', (req, res)=>{
    connection.query('SELECT count(u.id) FROM users as u \
    WHERE u.password = md5(?) AND u.email = ?', [req.params.id], (err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

/**
 * @author Santos M. Fabio
 * @date  26/01/2019
 * @see Get user by id with sql query
 * @return json 
 */
app.get('/get-users/:id', (req, res)=>{
    let user = req.body;
    connection.query('SELECT u.id,u.name,u.serial_number,u.position,u.email,u.status \
    FROM users as ud; \
    as u WHERE u.id = ?',
    [user.password, user.email], 
    (err, rows, fields)=>{
        if(res > 0){
            res.send(1);
        } else {
            res.send(0);
        }
    })
});


/**
 * @author Santos M. Fabio
 * @date  26/01/2019
 * @see Insert user with sql procedure
 * @see Update user with sql procedure
 * @return json 
 */
app.post('/post-user', (req, res)=>{
    let user = req.body;
    var query = "SET @id = ?;SET @name = ?;SET @serial_number = ?;SET @position = ?;SET @email = ?;SET @password = ?;SET @status = ?; \
    CALL usersAddOrEdit(@id,@name,@serial_number,@position,@email,@password,@status);";
    connection.query(query, [
        user.id, 
        user.name, 
        user.serial_number, 
        user.position,
        user.email, 
        user.password, 
        user.status
    ],(err, rows, fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});


/**
 * @author Santos M. Fabio
 * @date  26/01/2019
 * @see Delete or Update user with sql procedure
 * @return json 
 */
app.delete('/delete-user/:id', (req, res)=>{
    connection.query('DELETE FROM users WHERE id = ?',[req.params.id], (err, rows, fields)=>{
        if(!err)
            res.send('Deleted Successfully');
        else
            console.log(err);
    })
});