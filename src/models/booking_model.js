const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT b.id_booking,b.seats, b.selected_date, b.create_at, a.user_name, c.times FROM public.booking b
        left join (select id_user, json_agg(jsonb_build_object('id_user',id_user,'first_name',first_name,'last_name',last_name)) as user_name from users group by id_user) as a on a.id_user=b.id_user
        left join (select ts.id_time_schedule, json_agg(jsonb_build_object('id_time_schedule',ts.id_time_schedule,'time_schedule',ts.time_schedule)) as times from time_schedule ts group by ts.id_time_schedule) as c on c.id_time_schedule = b.id_time_schedule
        ORDER BY id_booking desc LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT b.id_booking,b.seats, b.selected_date, b.create_at, a.user_name, c.times FROM public.booking b
        left join (select id_user, json_agg(jsonb_build_object('id_user',id_user,'first_name',first_name,'last_name',last_name)) as user_name from users group by id_user) as a on a.id_user=b.id_user
        left join (select ts.id_time_schedule, json_agg(jsonb_build_object('id_time_schedule',ts.id_time_schedule,'time_schedule',ts.time_schedule)) as times from time_schedule ts group by ts.id_time_schedule) as c on c.id_time_schedule = b.id_time_schedule WHERE b.id_booking=$1;`, [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.getCountData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id_booking) as count_data from booking;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.addData = ({ id_time_schedule, id_user, seats, selected_date }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.booking (id_time_schedule, id_user, seats, selected_date) values ($1,$2,$3,$4);', [id_time_schedule, id_user, seats, selected_date])
            .then(() => {
                resolve('booking data successfully added.')
            }).catch(() => {
                reject('booking data failed to add.\'')
            })
    })
}

model.updateData = ({ id_booking, id_time_schedule, id_user, seats, selected_date }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.booking SET id_time_schedule=$2, id_user=$3, seats=$4, selected_date=$5 where id_booking = $1;', [id_booking, id_time_schedule, id_user, seats, selected_date])
            .then(() => {
                resolve('booking data successfully updated.')
            }).catch(() => {
                reject('booking data failed to update.\'')
            })
    })
}

model.deleteData = ({ id_booking }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_booking=$1', [id_booking])
            .then(() => {
                resolve('booking data successfully deleted.')
            }).catch(() => {
                reject('booking data failed to delete.\'')
            })
    })
}

module.exports = model