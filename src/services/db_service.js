import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'pm-apps.db', location: 'default'});
};
export const checkTable = async db => {
  let data = [];
  const query = `SELECT name FROM sqlite_master WHERE type='table' and name!='android_metadata';`;
  const results = await db.executeSql(query);
  for (let i = 0; i < results[0].rows.length; i++) {
    let row = results[0].rows.item(i);
    data.push(row);
  }
  return data;
};
export const createTableSchedule = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS schedules(
          schedule_id TEXT NOT NULL,
          jenis_pm TEXT NOT NULL,
          bulan_pm INTEGER NOT NULL
      );`;
  await db.executeSql(query);
};
export const createTablePmEndUser = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS pm_end_users(
      pm_end_user_id TEXT NOT NULL,
      nama_teknisi TEXT,
      jenis_perangkat TEXT,	
      tanggal TEXT,	
      id_user TEXT,	
      nama_lengkap TEXT,	
      person_responsible TEXT,	
      divisi TEXT,	
      satuan_kerja TEXT,
      lokasi TEXT,
      note TEXT
      );`;
  await db.executeSql(query);
};
export const createTableHardware = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS hardware_details(
    hardware_detail_id TEXT NOT NULL,
    pm_id	TEXT,
    merek	TEXT,
    serial_number	TEXT,
    lcd_serial_number	TEXT,
    mouse_serial_number TEXT,
    keyboard_serial_number TEXT,
    ip_address TEXT,
    user_login TEXT,
    os TEXT
  );`;
  await db.executeSql(query);
};
export const createTableChecklistPmEndUserDevices = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS checklist_pm_enduser_devices(
    checklist_end_user_devices_id	TEXT NOT NULL,
    pm_id	TEXT,
    ms_office_check INTEGER,	
    ms_office_note	TEXT,
    zip_check	INTEGER,
    zip_note	TEXT,
    web_browser_check	INTEGER,
    web_browser_note	TEXT,
    adobe_reader_check	INTEGER,
    adobe_reader_note	TEXT,
    forti_check	INTEGER,
    forti_note	TEXT,
    kav_check	INTEGER,
    kav_note	TEXT,
    libre_check INTEGER,
    libre_note TEXT,
    sap_check	INTEGER,
    sap_note	TEXT,
    dc_check	INTEGER,
    dc_note	TEXT,
    hw_cleaning_check INTEGER, 
    hw_cleaning_note TEXT
  );`;
  await db.executeSql(query);
};
export const createTableFisikEndUser = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS fisik_pm_end_user(
    fisik_pm_end_user_id TEXT NOT NULL,
    pm_id	TEXT,
    pc_monitor_notebook_check	INTEGER,
    pc_monitor_notebook_note	TEXT,
    keyboar_mouse_check	INTEGER,
    keyboar_mouse_note	TEXT,
    label_check INTEGER,
    label_note TEXT
  );`;
  await db.executeSql(query);
};

export const createTablePmNetworkDevice = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS pm_network_devices(
    pm_network_device_id TEXT NOT NULL,
    nama_teknisi TEXT,
    nama_perangkat TEXT,
    tipe_perangkat TEXT,
    tanggal TEXT,
    product TEXT,
    model TEXT,
    ip_address TEXT,
    lokasi TEXT,
    note TEXT
  );`;
  await db.executeSql(query);
};

export const createTableChecklistPmNetworkDevice = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS checklist_pm_network_devices(
    checklist_pm_network_id TEXT NOT NULL,
    pm_id TEXT,
    backup_config_check	INTEGER,
    backup_config_note TEXT,
    physical_check INTEGER,
    physical_note	TEXT,
    rj45_ceheck	INTEGER,
    rj45_note	TEXT,
    wallmount_check INTEGER,
    wallmount_note TEXT
  );`;
  await db.executeSql(query);
};

export const deleteTable = async (db, tablename) => {
  const query = `DROP TABLE ${tablename}`;
  await db.executeSql(query);
};
