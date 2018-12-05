const Quest_m = require('../db/models/quest.model.js');
const Reviews_m = require('../db/models/reviews.model');
const Brone_m = require('../db/models/brone.model');
const Single_page_c = require('./single_page.controller');
const Calendar_c = require('./mk.controller');
const Qroom_c = require('./qr.controller');
let error = require('./error.controller').error;




exports.mir_kvestov_schedule = (req, res) => {
    let url = req.url.split('/')

      Brone_m.find()
      .then(brones => {
        brones = brones.filter( brone => brone.quest_name === url[3]); if (brones.length < 1) error(res, 'No quests found')
        let schedule = Calendar_c.scheduler(14, brones)
        let mir_kvestov_schedule = JSON.stringify(schedule)
        mir_kvestov_schedule = mir_kvestov_schedule.slice(1, -1)
        res.status(200).send(mir_kvestov_schedule)
      }).catch(err => {
      error(res, err)
      });
}

exports.mir_kvestov_brone = (req, res) => {
    if(!req.body) {
        return res.status(400).send({"success": false, "message": "Указанное время занято" });
    }
    let mir_kvestov_brone_request = req.body

    const brone = new Brone_m(req.body);
    // we can add md5 later
    brone.save(
{      timestamp : Date.now(),
      brone_time : req.body.date + ' ' + req.body.time,
      name : req.body.first_name + ' ' + req.body.family_name || req.body.first_name || '',
      phone : req.body.phone,
      price : req.body.price,
      time : req.body.time,
      quest_name : req.body.quest_name,
      mk_unique_id : req.body.unique_id,
      mk_your_slot_id : req.body.your_slot_id,
      company_name : req.body.company_name}
    )
    .then(data => {
          console.log('da');
          console.log(data);
      res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({"success": false, "message": "Указанное время занято" });
    });
};


exports.questroom_api = (req, res) => {
  console.log('questroom_api');
  let questroom_request = req.body
  Brone_m.find()
  .then(brones => {
    brones = brones.filter( brone => brone.quest_name === req.body.room.split('-')[0]);
    if (brones.length < 1) error(res, 'No quests found')
    if (req.body.token !== '67CZ8DGLhljpSLo7iXrD') error(res, 'Wrong key');
     req.brones = brones;
       switch (req.body.task) {
         case 'showDays_all': Qroom_c.showDays_all(req, res); break;
         case 'showDay_any':  Qroom_c.showDay_any(req, res);  break;
         case 'showHour':     Qroom_c.showHour(req, res);     break;
         case 'bookingHour':  Qroom_c.bookingHour(req, res);  break;
         default:
         error(res, 'Assignment unknown')
       }
  }).catch(err => {
  error(res, err)
  });
}


exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Brone_m content can not be empty"
        });
    }
    const brone = new Brone_m(req.body);
    brone.save()
    .then(data => {
          console.log('da');
          console.log(data);
      res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Brone_m."
        });
    });
};

exports.findAll = (req, res) => {
    Brone_m.find()
    .then(brones => {
        res.status(200).send(brones);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving brones."
        });
    });
};

exports.findOne = (req, res) => {
    Brone_m.findById(req.params.broneId)
    .then(brone => {
        if(!brone) {
            return res.status(404).send({
                message: "Brone_m not found with id " + req.params.noteId
            });
        }
        res.send(brone);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Brone_m not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving brone with id " + req.params.noteId
        });
    });
};
exports.custom_update = (req, res) => {
var the_data = '';
for (let prop in req.body) {
  if (!JSON.parse(req.body[prop])){console.error('ERO');}
  the_data = JSON.parse(prop)
}
delete the_data["noteId"];
    Brone_m.findByIdAndUpdate(req.params.noteId, the_data, {new: true})
    .then(brone => {
        if(!brone) {
            return res.status(404).send({
                message: "Brone_m not found with id " + req.params.noteId
            });
        }
        res.status(200).send(the_data);
        for (var member in myObject) delete myObject[member];
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Brone_m not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating brone with id " + req.params.noteId
        });
    });
};
exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Brone_m content can not be empty"
        });
    }
    Brone_m.findByIdAndUpdate(req.params.noteId, req.body, {new: true})
    .then(brone => {
        if(!brone) {
            return res.status(404).send({
                message: "Brone_m not found with id " + req.params.noteId
            });
        }
        res.status(200).send(brone);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Brone_m not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating brone with id " + req.params.noteId
        });
    });
};
exports.delete = (req, res) => {
    Brone_m.findByIdAndRemove(req.params.noteId)
    .then(brone => {
        if(!brone) {
            return res.status(404).send({
                message: "Brone_m not found with id " + req.params.noteId
            });
        }
        res.status(200).send({message: "Brone_m deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Brone_m not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Could not delete brone with id " + req.params.noteId
        });
    });
};
