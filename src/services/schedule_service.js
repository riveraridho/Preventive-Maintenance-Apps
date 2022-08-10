import {openDatabase, enablePromise} from 'react-native-sqlite-storage';
import moment from 'moment';
import Toast from 'native-base';

enablePromise(true);

export const listSchedule = async db => {
  let data = [];
  const query = `SELECT * FROM schedules`;
  const results = await db.executeSql(query);
  for (let i = 0; i < results[0].rows.length; i++) {
    let row = results[0].rows.item(i);
    data.push(row);
  }
  return data;
};
export const createSchedule = async (db, schedule) => {
  console.log('db :' + schedule);
  const query = `INSERT INTO schedules (schedule_id,jenis_pm,bulan_pm) VALUES(
    '${schedule.id}','${schedule.jenis_pm}','${schedule.bulan_pm}');`;
  await db.executeSql(query);
};
export const viewSchedule = async (db, id) => {
  const query = `SELECT * FROM schedules WHERE schedule_id='${id}'`;
  const results = await db.executeSql(query);
  const data = [];
  for (let i = 0; i < results[0].rows.length; i++) {
    let row = results[0].rows.item(i);
    data.push(row);
  }
  return data[0];
};
export const updateScheule = async (db, schedule) => {
  const query = `UPDATE schedules SET jenis_pm='${schedule.jenis_pm}',bulan_pm='${schedule.bulan_pm}' WHERE schedule_id='${schedule.schedule_id}'`;
  await db.executeSql(query);
};
export const deleteSchedule = async (db, id) => {
  const query = `DELETE FROM schedules WHERE schedule_id='${id}'`;
  // const query = `DELETE FROM schedules`;
  await db.executeSql(query);
};

export const nextSchedule = async db => {
  let data = [];
  const thisMonth = moment().month();
  const nextMonth = thisMonth + 1;
  const query = `SELECT * FROM schedules WHERE bulan_pm=${nextMonth}`;
  const hasil = await db.executeSql(query);
  for (let i = 0; i < hasil[0].rows.length; i++) {
    let row = hasil[0].rows.item(i);
    data.push(row);
  }
  console.log('hasil: ', data);
  return data;
};
