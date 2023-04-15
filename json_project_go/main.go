package main

import "github.com/gin-gonic/gin"
import _ "github.com/lib/pq"
import "net/http"
import "io/ioutil"
import "encoding/json"
import "fmt"
import "database/sql"





func main() {
	url := "https://randomuser.me/api"

	spaceClient := http.Client{}

	req, err := http.NewRequest(http.MethodGet, url,nil)
	if err != nil {
        panic(err)
    }
	res, err := spaceClient.Do(req)
	if err != nil {
        panic(err)
    }
	body, _ := ioutil.ReadAll(res.Body)

	if res.Body != nil {
		defer res.Body.Close()
	}

	var data Response
	json.Unmarshal(body, &data)
	
	// База данных
	const (
		host = "localhost"
		port = 5432
		user = "postgres"
		password = "123456"
		dbname = "postgres"
	)

	connStr := fmt.Sprintf("host=%s port=%d user=%s "+
	"password=%s dbname=%s sslmode=disable",
	host, port, user, password, dbname)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	var json = data.Results[0]
	var loc = json.Location
	var log = json.Login
	sqlStatement := fmt.Sprintf(`INSERT INTO isi_data VALUES (
	'%s','%s','%s','%s',%d,'%s','%s','%s','%s',%d,'%s','%s','%s',
	'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s',%d,'%s',%d,'%s','%s','%s','%s','%s','%s','%s','%s')`,
json.Gender,
json.Name.Title,
json.Name.First,
json.Name.Last,
loc.Street.Number,
loc.Street.Name,
loc.City,
loc.State,
loc.Country,
loc.Postcode,
loc.Coordinates.Latitude,loc.Coordinates.Longitude,
loc.Timezone.Offset,loc.Timezone.Description,
json.Email,log.Uuid,log.Username,log.Password,
log.Salt,log.Md5,log.Sha1,log.Sha256,
json.Dob.Date,json.Dob.Age, json.Registered.Date,json.Registered.Age,
json.Phone,json.Cell, json.Id.Name,json.Id.Value,
json.Picture.Large,json.Picture.Medium,json.Picture.Thumbnail,
json.Nat)
_, err = db.Exec(sqlStatement)
if err != nil {
  panic(err)
}
   router := gin.Default()
   router.GET("/", func(c *gin.Context) {
	c.String(200, string("Успешно добавлено!"))
	})
   
   router.Run()
}