const { openDiary } = require('../models');

exports.postOpenStory = async (req, res, next) => {
    try {
        const diary = await openDiary.create({
          title: req.body.title,
          content: req.body.content
        });
        return res.send({
            Message: "공개 일기 등록이 완료되었습니다.", 
            ResultCode: "OpenDiary_Create_Success",
        });       
    }        
    catch (err) {
        console.log(err);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
};