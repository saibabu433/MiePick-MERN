
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/image-store');
var conn = mongoose.connection;
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);

app.use('/picture/uploads', express.static(__dirname + '/uploads'));


//import server js data 
var User = require('./model/Photoupload');

/** Seting up server to accept cross-origin browser requests */
app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());


// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});
 
var upload = multer({
 storage: storage
});



app.post('/createdata', function(req,res){
   var Userdata = new User(req.body);
   Userdata.save(function(err,userdata){
    if(err){
      res.status(500).json("NO user data")
    }else{
      res.json(userdata);
    }
   })
})



app.post('/userdata', upload.any(), function(req, res) {  
          //response.send(savedProduct);
           var useriddd = "5bb50486c6c81c2c7c67d4f6";
           var filesid = req.files;  
          console.log("req.files",req.files) 
        for(var i=0;i<filesid.length;i++){  
        User.findOneAndUpdate({_id:useriddd},{$push:{userpics:{paths:filesid[i].path,originalname:filesid[i].originalname}}},{new:true},function(err,filesdata){
        if(err){
          console.log("not Suceess");
           res.status(500).json("no data");
        }else{ 
           //res.json(filesdatas.userpics);
          /* User.find({_id:useriddd},function(err,userpicsdata){
            if(err){
              res.status(500).json("no data");
            }else{
              res.json(userpicsdata[0].userpics);
            }
           })*/
        }
      })
    }   
});


app.get('/userdata' , function(req,res){
  var useriddd = "5bb50486c6c81c2c7c67d4f6";
  User.find({_id:useriddd},function(err,useralldata){
    if(err){
      res.status(500).json("Get no user data");
    }else{
      res.json(useralldata[0].userpics);
    }
  })
})







///write new service 
/*app.post('/photoupload',upload.any(), function(req,res,next){ 
  var useriddd = "5b973bd12c60da16c86f35a8";
  var filesid = req.files;  
  console.log("req.files",req.files)
   for(var i=0;i<filesid.length;i++){  
    Image.findOneAndUpdate({_id:useriddd},{$push:{userpics:{paths:filesid[i].path,originalname:filesid[i].originalname}}},{new:true},function(err,filesdata){
    if(err){
       console.log("not Suceess");
        res.status(500).json("no data");
    }else{
      console.log("Suceessfullll")
      res.json("succssfull update");
    }
  })
    } 
})*/ 




///image set the image
app.get('/picture/:id',function(req,res){
    var userid = "5bb50486c6c81c2c7c67d4f6";
    User.findById({_id:userid},function(err,file){
      console.log("file",file)
      if (err) {
        res.status(500).json("no data");
      }  
      res.json(file.userpics);
    });
  });







 





/** Setting up storage using multer-gridfs-storage */
var storage = GridFsStorage({
  gfs : gfs,
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  },
  /** With gridfs we can store aditional meta-data along with the file */
  metadata: function(req, file, cb) {
    cb(null, { originalname: file.originalname });
  },
  root: 'ctFiles' //root name for collection to store files into
});

var upload = multer({ //multer settings for single upload
  storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    res.json({error_code:0,err_desc:null});
  });
});

app.get('/file/:filename', function(req, res){
  gfs.collection('ctFiles'); //set collection name to lookup into

  /** First check if file exists */
  gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
    if(!files || files.length === 0){
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    /** create read stream */
    var readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: "ctFiles"
    });
    /** set the proper content type */
    res.set('Content-Type', files[0].contentType)
    /** return response */
    return readstream.pipe(res);
  });
});

app.get('/file', function(req, res){
  gfs.collection('ctFiles'); //set collection name to lookup into

  gfs.files.find().toArray(function(err, files){
    if(!files || files.length === 0){
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    res.send(JSON.stringify(files));
  });
});

app.listen('3002', function(){
  console.log('Running on 3002...');
});
