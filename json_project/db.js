const { Client } = require('pg');



async function insertJson (
    gender,
	title,
	first,
	last,
	street_number,
	street_name,
	city,
	state,
	country,
	postcode,
	coord_lat,
	coord_long,
	time_offset,
	time_desc,
	email,
	uuid,
	username,
	password,
	salt,
	md5,
	sha1,
	sha256,
	dob_date,
	dob_age,
	reg_date,
	reg_age,
	phone,
	cell,
	id_name,
	id_value,
	pic_large,
	pic_medium,
	pic_thumb,
	nat
) {
    try {
        const client = new Client({
            host: '127.0.0.1',
            user: 'postgres',
            database: 'postgres',
            password: '123456',
            port: 5432,
        });
        await client.connect();  
        await client.query(
            `INSERT INTO "isi_data"
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,
                $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34)`, [gender,
                title,
                first,
                last,
                street_number,
                street_name,
                city,
                state,
                country,
                postcode,
                coord_lat,
                coord_long,
                time_offset,
                time_desc,
                email,
                uuid,
                username,
                password,
                salt,
                md5,
                sha1,
                sha256,
                dob_date,
                dob_age,
                reg_date,
                reg_age,
                phone,
                cell,
                id_name,
                id_value,
                pic_large,
                pic_medium,
                pic_thumb,
                nat]);
                await client.end(); 
               
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = {
    insertJson
}