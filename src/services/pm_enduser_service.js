import {openDatabase, enablePromise, DEBUG} from 'react-native-sqlite-storage';

enablePromise(true);
DEBUG(true);

export const listPmEnduser = async db => {
  let data = [];
  const query = `SELECT * FROM pm_end_users peu
  INNER JOIN hardware_details hd ON hd.pm_id=peu.pm_end_user_id
  INNER JOIN fisik_pm_end_user fpeu ON fpeu.pm_id=peu.pm_end_user_id
  INNER JOIN checklist_pm_enduser_devices cped ON cped.pm_id=peu.pm_end_user_id`;
  const results = await db.executeSql(query);
  console.log(results[0]);
  for (let i = 0; i < results[0].rows.length; i++) {
    let row = results[0].rows.item(i);
    data.push(row);
  }
  return data;
};

export const createPmEnduser = async (db, PmEnduser) => {
  db.transaction(tx => {
    const pmEnduserDeviceInserted = tx.executeSql(
      `INSERT INTO pm_end_users (
            pm_end_user_id,
            nama_teknisi,
            jenis_perangkat,
            tanggal,
            id_user,
            nama_lengkap,
            person_responsible,
            divisi,
            satuan_kerja,
            lokasi,
            note) VALUES(
            '${PmEnduser.pm_end_user_id}',
            '${PmEnduser.nama_teknisi}',
            '${PmEnduser.jenis_perangkat}',
            '${PmEnduser.tanggal}',
            '${PmEnduser.id_user}',
            '${PmEnduser.nama_lengkap}',
            '${PmEnduser.person_responsible}',
            '${PmEnduser.divisi}',
            '${PmEnduser.satuan_kerja}',
            '${PmEnduser.lokasi}',
            '${PmEnduser.note}'); `,
      [],
    );
    tx.executeSql(
      `INSERT INTO hardware_details (
            hardware_detail_id,
            pm_id,
            merek,
            serial_number,
            lcd_serial_number,
            mouse_serial_number,
            keyboard_serial_number,
            ip_address,
            user_login,
            os) VALUES(
            '${PmEnduser.hardware.hardware_detail_id}',
            '${PmEnduser.hardware.pm_id}',
            '${PmEnduser.hardware.merek}',
            '${PmEnduser.hardware.serial_number}',
            '${PmEnduser.hardware.lcd_serial_number}',
            '${PmEnduser.hardware.mouse_serial_number}',
            '${PmEnduser.hardware.keyboard_serial_number}',
            '${PmEnduser.hardware.ip_address}',
            '${PmEnduser.hardware.user_login}',
            '${PmEnduser.hardware.os}');`,
      [],
    );
    tx.executeSql(
      `INSERT INTO checklist_pm_enduser_devices(
        checklist_end_user_devices_id,
        pm_id,
        ms_office_check,
        ms_office_note,
        zip_check,
        zip_note,
        web_browser_check,
        web_browser_note,
        adobe_reader_check,
        adobe_reader_note,
        forti_check,
        forti_note,
        kav_check,
        kav_note,
        libre_check,
        libre_note,
        sap_check,
        sap_note,
        dc_check,
        dc_note,
        hw_cleaning_check,
        hw_cleaning_note) VALUES (
          '${PmEnduser.checklist.checklist_end_user_devices_id}',
          '${PmEnduser.checklist.pm_id}',
          '${PmEnduser.checklist.ms_office_check}',	
          '${PmEnduser.checklist.ms_office_note}',
          '${PmEnduser.checklist.zip_check}',
          '${PmEnduser.checklist.zip_note}',
          '${PmEnduser.checklist.web_browser_check}',
          '${PmEnduser.checklist.web_browser_note}',
          '${PmEnduser.checklist.adobe_reader_check}',
          '${PmEnduser.checklist.adobe_reader_note}',
          '${PmEnduser.checklist.forti_check}',
          '${PmEnduser.checklist.forti_note}',
          '${PmEnduser.checklist.kav_check}',
          '${PmEnduser.checklist.kav_note}',
          '${PmEnduser.checklist.libre_check}',
          '${PmEnduser.checklist.libre_note}',
          '${PmEnduser.checklist.sap_check}',
          '${PmEnduser.checklist.sap_note}',
          '${PmEnduser.checklist.dc_check}',
          '${PmEnduser.checklist.dc_note}',
          '${PmEnduser.checklist.hw_cleaning_check}', 
          '${PmEnduser.checklist.hw_cleaning_note}');`,
      [],
    );
    tx.executeSql(
      `INSERT INTO fisik_pm_end_user(
        fisik_pm_end_user_id,
        pm_id,
        pc_monitor_notebook_check,
        pc_monitor_notebook_note,
        keyboar_mouse_check,
        keyboar_mouse_note,
        label_check,
        label_note) VALUES(
          '${PmEnduser.fisik.fisik_pm_end_user_id}',
          '${PmEnduser.fisik.pm_id}',
          '${PmEnduser.fisik.pc_monitor_notebook_check}',
          '${PmEnduser.fisik.pc_monitor_notebook_note}',
          '${PmEnduser.fisik.keyboar_mouse_check}',
          '${PmEnduser.fisik.keyboar_mouse_note}',
          '${PmEnduser.fisik.label_check}',
          '${PmEnduser.fisik.label_note}');`,
      [],
    );
  });
};

export const viewPmEnduser = async (db, id) => {
  let data = [];
  const query = `SELECT * FROm pm_end_users peu
  INNER JOIN hardware_details hd ON hd.pm_id=peu.pm_end_user_id
  INNER JOIN fisik_pm_end_user fpeu ON fpeu.pm_id=peu.pm_end_user_id
  INNER JOIN checklist_pm_enduser_devices cped ON cped.pm_id=peu.pm_end_user_id where pm_end_user_id='${id}'`;
  const results = await db.executeSql(query);
  console.log(results[0]);
  for (let i = 0; i < results[0].rows.length; i++) {
    let row = results[0].rows.item(i);
    data.push(row);
  }
  return data[0];
};

export const updatePmEnduser = async (db, PmEnduser) => {
  db.transaction(tx => {
    const pmNetworkDeviceUpdated = tx.executeSql(
      `UPDATE pm_end_users SET
      jenis_perangkat = '${PmEnduser.jenis_perangkat}',
      tanggal = '${PmEnduser.tanggal}',
      id_user = '${PmEnduser.id_user}',
      nama_lengkap = '${PmEnduser.nama_lengkap}',
      person_responsible = '${PmEnduser.person_responsible}',
      divisi = '${PmEnduser.divisi}',
      satuan_kerja = '${PmEnduser.satuan_kerja}',
      lokasi = '${PmEnduser.lokasi}',
      note = '${PmEnduser.note}' WHERE pm_end_user_id='${PmEnduser.pm_end_user_id}'`,
      [],
    );
    tx.executeSql(
      `UPDATE hardware_details set 
        'pm_id' = '${PmEnduser.hardware.pm_id}',
        'merek' = '${PmEnduser.hardware.merek}',
        'serial_number' = '${PmEnduser.hardware.serial_number}',
        'lcd_serial_number' = '${PmEnduser.hardware.lcd_serial_number}',
        'mouse_serial_number' = '${PmEnduser.hardware.mouse_serial_number}',
        'keyboard_serial_number' = '${PmEnduser.hardware.keyboard_serial_number}',
        'ip_address' = '${PmEnduser.hardware.ip_address}',
        'user_login' = '${PmEnduser.hardware.user_login}',
        'os' = '${PmEnduser.hardware.os}' WHERE hardware_detail_id='${PmEnduser.hardware.hardware_detail_id}';`,
      [],
    );
    tx.executeSql(
      `UPDATE checklist_pm_enduser_devices set
        'pm_id' = '${PmEnduser.checklist.pm_id}',
        'ms_office_check' = '${PmEnduser.checklist.ms_office_check}',
        'ms_office_note' = '${PmEnduser.checklist.ms_office_note}',
        'zip_check' = '${PmEnduser.checklist.zip_check}',
        'zip_note' = '${PmEnduser.checklist.zip_note}',
        'web_browser_check' = '${PmEnduser.checklist.web_browser_check}',
        'web_browser_note' = '${PmEnduser.checklist.web_browser_note}',
        'adobe_reader_check' = '${PmEnduser.checklist.adobe_reader_check}',
        'adobe_reader_note' = '${PmEnduser.checklist.adobe_reader_note}',
        'forti_check' = '${PmEnduser.checklist.forti_check}',
        'forti_note' = '${PmEnduser.checklist.forti_note}',
        'kav_check' = '${PmEnduser.checklist.kav_check}',
        'kav_note' = '${PmEnduser.checklist.kav_note}',
        'libre_check' = '${PmEnduser.checklist.libre_check}',
        'libre_note' = '${PmEnduser.checklist.libre_note}',
        'sap_check' = '${PmEnduser.checklist.sap_check}',
        'sap_note' = '${PmEnduser.checklist.sap_note}',
        'dc_check' = '${PmEnduser.checklist.dc_check}',
        'dc_note' = '${PmEnduser.checklist.dc_note}',
        'hw_cleaning_check' = '${PmEnduser.checklist.hw_cleaning_check}',
        'hw_cleaning_note' = '${PmEnduser.checklist.hw_cleaning_note}' WHERE checklist_end_user_devices_id='${PmEnduser.checklist.checklist_end_user_devices_id}';`,
      [],
    );
    tx.executeSql(
      `UPDATE fisik_pm_end_user set 
        'pm_id' = '${PmEnduser.fisik.pm_id}',
        'pc_monitor_notebook_check' = '${PmEnduser.fisik.pc_monitor_notebook_check}',
        'pc_monitor_notebook_note' = '${PmEnduser.fisik.pc_monitor_notebook_note}',
        'keyboar_mouse_check' = '${PmEnduser.fisik.keyboar_mouse_check}',
        'keyboar_mouse_note' = '${PmEnduser.fisik.keyboar_mouse_note}',
        'label_check' = '${PmEnduser.fisik.label_check}',
        'label_note' = '${PmEnduser.fisik.label_note}' WHERE fisik_pm_end_user_id='${PmEnduser.fisik.fisik_pm_end_user_id}';`,
      [],
    );
  });
};

export const deletePmEnduser = async (db, id) => {
  db.transaction(tx => {
    tx.executeSql(`DELETE FROM pm_end_users where pm_end_user_id='${id}' `, []);
    tx.executeSql(`DELETE FROM hardware_details where pm_id='${id}' `, []);
    tx.executeSql(
      `DELETE FROM checklist_pm_enduser_devices where pm_id='${id}' `,
      [],
    );
    tx.executeSql(`DELETE FROM fisik_pm_end_user where pm_id='${id}' `, []);
  });
};

export const totalPmEnduser = async db => {
  const query = `SELECT * FROM pm_end_users`;
  //const query = `SELECT COUNT(pm_end_user_id) FROM pm_end_users`;
  const result = await db.executeSql(query);
  return result;
};
