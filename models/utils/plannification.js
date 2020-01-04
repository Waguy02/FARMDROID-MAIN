


class Plannification{
    type
    date_debut
    date_fin
    perdio_duration;
    period_number;
    dayRefs=[]
    months_ref;
    actions_per_day;
    actions_per_hour;

}

module.exports.Plannification=Plannification;
    
    
    

const types_plannification={
PERIODICALLY:-1,
DAILY:1,
WEEKLY:2,
MONTHLY:3,
YEARLY:4,
}
module.exports.types_plannification=types_plannification;
    
    