package main
import (
   "fmt"
   "github.com/gin-contrib/cors"                        
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"    
)
var db *gorm.DB                                      
var err error
type Question struct {
   ID uint `json:"id"`
   Qid uint `json:"qid"`
   Answer string `json:"answer"`
   Question string `json:"question"`
   OptionA string `json:"optionA"`
   OptionB string `json:"optionB"`
   OptionC string `json:"optionC"`
   OptionD string `json:"optionD"`
   OptionE string `json:"optionE"`
}
type Quiz struct {
   ID uint `json:"id"`
   Gid uint `json:"gid"`
   QuizTitle string `json:"qtitle"`
   SingleChoice string `json:"schoice"`
}
type Genre struct {
   ID uint `json:"id"`
   GenerName string `json:gname`
}
type Scoref struct{
   ID uint `json:"id"`
   Nam string `json:"nam"`
   Qid uint `json:"qid"`
   Gid uint `json:"gid"`
   Score uint `json:"score"`
}
type User struct{
	ID uint `json:"id"`
Name string `json:"name"`
   	Email string `json:"email"`
   	Password string `json:password`
}
func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()
   db.AutoMigrate(&User{},&Genre{}, &Quiz{},&Question{},&Scoref{})
   r := gin.Default()
   r.GET("/genre/", GetGenres)    
   r.POST("/genre", CreateGenre)
   r.DELETE("/genre/:id", DeleteGenre)
   g1 := Genre{GenerName: "harryPotter"}
   g2 := Genre{GenerName: "CompSc"}
   db.Create(&g1) 
   db.Create(&g2) 
   r.GET("/quiz/:id", GetQuizzes)
   r.POST("/quiz", CreateQuiz)
   r.DELETE("/quiz/:id", DeleteQuiz)

   r.GET("/users/", GetPeople)                             
   r.GET("/users/:id", GetPerson)
   r.POST("/users", CreatePerson)
   r.PUT("/users/:id", UpdatePerson)
   r.DELETE("/users/:id", DeletePerson)
   
   r.GET("/question/:id", GetQuestions)
   r.POST("/question", CreateQuestion)
   r.GET("/scoreboard", GetScoreBoard)
   r.GET("/scoreboard/:gid", GetGenreScoreBoard)
   r.POST("/score", CreateScore)
   r.GET("/score/:gid/:qid/:una", GetScore)
   r.PUT("/question/:id", UpdateQuestion)
  // r.PUT("/question/:id", UpdateQuestion)
   r.DELETE("/question/:id", DeleteQuestion)

   r.POST("/signup",SignUp)
   r.POST("/login",Login)
   r.Use((cors.Default()))
   r.Run(":8080")                                           
}

func GetGenres(c *gin.Context) {
   var genre []Genre
   if err := db.Find(&genre).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, genre)
   }
}


func CreateGenre(c *gin.Context) {
   var genre Genre
   c.BindJSON(&genre)
   db.Create(&genre)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, genre)
}
////////////////////
///////////////////////////////
func CreateScore(c *gin.Context) {
   var sco Scoref
   c.BindJSON(&sco)
   fmt.Println(sco)
   db.Create(&sco)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, sco)
}
func GetScoreBoard(c *gin.Context){
   type ScoreBoard struct{
   Nam string `json:"nam"`
   Total uint `json:"total"`
   }
   var scoreboard []ScoreBoard
      err :=db.Raw("SELECT  nam, SUM(score) as total FROM scorefs GROUP BY nam ORDER BY total desc").Scan(&scoreboard).Error

   if(err!=nil){
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, scoreboard)
      fmt.Println(scoreboard)
   }
}
func GetGenreScoreBoard(c *gin.Context){
   gidd :=c.Params.ByName("gid")
   type ScoreBoard struct{
 
   Nam string `json:"nam"`
   Total uint `json:"total"`
   }
   var scoreboard []ScoreBoard
   // err :=db.Raw("SELECT nam as Name, SUM(score) as Score FROM Scoref GROUP BY Name ORDER BY Score desc").Scan(&scoreboard).Error
      err :=db.Raw("SELECT  nam, SUM(score) as total FROM scorefs WHERE gid = ? GROUP BY nam ORDER BY total desc ", gidd).Scan(&scoreboard).Error

   if(err!=nil){
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, scoreboard)
      fmt.Println(scoreboard)
   }

}
func GetScore(c *gin.Context) {
   uname := c.Params.ByName("una")
   qidd :=c.Params.ByName("qid")
   gidd :=c.Params.ByName("gid")
   var sco []Scoref
   if err := db.Where("Nam = ?",uname).Where("Qid = ?",qidd).Where("Gid = ?",gidd).Find(&sco).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, sco)
   }
}
func SignUp(c *gin.Context) {
   var user User
   var temp User
   var temp1 User
   c.BindJSON(&user)
   db.Where("Name = ?",user.Name).Find(&temp) 
    db.Where("Name = ?",user.Email).Find(&temp1) 
   if len(temp.Name) >=1 || len(temp1.Name) >=1 || len(user.Name)<1{ 
       c.Header("access-control-allow-origin", "*")
          c.JSON(400, user)
      } else{
      db.Create(&user)
       c.Header("access-control-allow-origin", "*")
      c.JSON(200, user)
   }  
}
func Login(c *gin.Context) {
   var user User
   var temp User
   c.BindJSON(&user)
   db.Where("Name = ?",user.Name).Where("Password = ?",user.Password).Find(&temp)
   if len(temp.Name) >=1 { 
       c.Header("access-control-allow-origin", "*")
          c.JSON(200, temp)
      } else{
         c.Header("access-control-allow-origin", "*")
         c.JSON(400, user)
   }  
}
func DeleteGenre(c *gin.Context) {
   id := c.Params.ByName("id")
   var genre Genre
   d := db.Where("id = ?", id).Delete(&genre)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

func GetQuizzes(c *gin.Context) {
   id := c.Params.ByName("id")
   var quiz []Quiz
   if err := db.Where("gid = ?",id).Find(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, quiz)
   }
}
func CreateQuiz(c *gin.Context) {
   var quiz Quiz
   var genre Genre
   c.BindJSON(&quiz)
   err := db.Where("id = ?",quiz.Gid).Find(&genre).Error
   if len(quiz.QuizTitle) < 1  || len(quiz.SingleChoice) < 1 || err!=nil { 
       c.Header("access-control-allow-origin", "*")
          c.JSON(400, quiz)
      } else{
      db.Create(&quiz)
       c.Header("access-control-allow-origin", "*")
      c.JSON(200, quiz)
   }  
}
func DeleteQuiz(c *gin.Context) {
   id := c.Params.ByName("id")
   var quiz Quiz
   var ques []Question
   d := db.Where("id = ?", id).Delete(&quiz)
   fmt.Println(d)
   q := db.Where("qid = ?", id).Delete(&ques)
   fmt.Println(q)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted from Quiz and Questions"})
}
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

func GetQuestions(c *gin.Context) {
   id := c.Params.ByName("id")   
   var ques []Question
   if err := db.Where("Qid = ?", id).Find(&ques).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
       c.Header("access-control-allow-origin", "*")
      c.JSON(200, ques)
   }
}
func CreateQuestion(c *gin.Context) {
   var ques Question
   c.BindJSON(&ques)
   var quiz Quiz
   db.Where("ID = ?", ques.Qid).Find(&quiz)
    if len(ques.Question)<1 || len(ques.OptionA)<1 || len(ques.OptionB)<1|| len(ques.OptionC)<1|| len(ques.OptionD)<1|| len(ques.OptionE)<1 ||len(ques.Answer)<1 ||len(ques.Answer)<=1 && quiz.SingleChoice=="MultipleChoice"||len(ques.Answer)>1 && quiz.SingleChoice=="Singlechoice"{ 
       c.Header("access-control-allow-origin", "*")
          c.JSON(400, ques)
      } else{
      db.Create(&ques)
       c.Header("access-control-allow-origin", "*")
      c.JSON(200,ques)
   }  
   
}
func UpdateQuestion(c *gin.Context) {
   var ques Question
   id := c.Params.ByName("id")
   c.BindJSON(&ques)
   if err := db.Where("id = ?", id).First(&ques).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   db.Save(&ques)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, ques)
}

func DeleteQuestion(c *gin.Context) {
   id := c.Params.ByName("id")
   var ques Question
   d := db.Where("id = ?", id).Delete(&ques)
   fmt.Println(d)
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person User
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
   var person User
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&person)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, person)
}

func CreatePerson(c *gin.Context) {
   var person User
   c.BindJSON(&person)
   db.Create(&person)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, person)
}

func GetPerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person User
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, person)
   }
}

func GetPeople(c *gin.Context) {
   var people []User
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, people)
   }
}