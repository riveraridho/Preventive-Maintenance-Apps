import {openDatabase, enablePromise, DEBUG} from 'react-native-sqlite-storage';

enablePromise(true);
DEBUG(true);

export const listPmNetwork = async db => {
  let data = [];
  const query = `SELECT * FROM pm_network_devices n inner join checklist_pm_network_devices c on c.pm_id = n.pm_network_device_id`;
  const results = await db.executeSql(query);
  console.log(results[0]);
  for (let i = 0; i < results[0].rows.length; i++) {
    let row = results[0].rows.item(i);
    data.push(row);
  }
  return data;
};
export const createPmNetwork = async (db, PmNetwork) => {
  db.transaction(tx => {
    const pmNetworkDeviceInserted = tx.executeSql(
      `INSERT INTO pm_network_devices (
      pm_network_device_id,
      nama_teknisi,
      nama_perangkat,
      tipe_perangkat,
      tanggal,
      product,
      model,
      ip_address,
      lokasi,
      note) VALUES(
      '${PmNetwork.pm_network_device_id}',
      '${PmNetwork.nama_teknisi}',
      '${PmNetwork.nama_perangkat}',
      '${PmNetwork.tipe_perangkat}',
      '${PmNetwork.tanggal}',
      '${PmNetwork.product}',
      '${PmNetwork.model}',
      '${PmNetwork.ip_address}',
      '${PmNetwork.lokasi}',
      '${PmNetwork.note}');`,
      [],
    );
    tx.executeSql(
      `INSERT INTO checklist_pm_network_devices (
          'checklist_pm_network_id',
          'pm_id',
          'backup_config_check',
          'backup_config_note',
          'physical_check',
          'physical_note',
          'rj45_ceheck',
          'rj45_note',
          'wallmount_check',
          'wallmount_note' 
        ) VALUES (
          '${PmNetwork.checklist.checklist_pm_network_id}',
          '${PmNetwork.checklist.pm_checklist_id}',
          '${PmNetwork.checklist.backup_config_check}',
          '${PmNetwork.checklist.backup_config_note}',
          '${PmNetwork.checklist.physical_check}',
          '${PmNetwork.checklist.physical_note}',
          '${PmNetwork.checklist.rj45_ceheck}',
          '${PmNetwork.checklist.rj45_note}',
          '${PmNetwork.checklist.wallmount_check}',
          '${PmNetwork.checklist.wallmount_note}');`,
      [],
    );
  });
};
export const viewPmNetwork = async (db, id) => {
  let data = [];
  const query = `SELECT * FROM pm_network_devices n inner join checklist_pm_network_devices c on c.pm_id = n.pm_network_device_id where pm_network_device_id='${id}'`;
  const results = await db.executeSql(query);
  console.log(results[0]);
  for (let i = 0; i < results[0].rows.length; i++) {
    let row = results[0].rows.item(i);
    data.push(row);
  }
  return data[0];
};
export const updatePmNetwork = async (db, PmNetwork) => {
  console.log('update: ', PmNetwork);
  db.transaction(tx => {
    const pmNetworkDeviceUpdated = tx.executeSql(
      `UPDATE pm_network_devices SET
      nama_perangkat ='${PmNetwork.nama_perangkat}',
      tipe_perangkat ='${PmNetwork.tipe_perangkat}',
      tanggal='${PmNetwork.tanggal}',
      product='${PmNetwork.product}',
      model='${PmNetwork.model}',
      ip_address='${PmNetwork.ip_address}',
      lokasi='${PmNetwork.lokasi}',
      note='${PmNetwork.note}' WHERE pm_network_device_id='${PmNetwork.pm_network_device_id}'`,
      [],
    );
    tx.executeSql(
      `UPDATE checklist_pm_network_devices set
          'pm_id'='${PmNetwork.checklist.pm_network_device_id}',
          'backup_config_check'='${PmNetwork.checklist.backup_config_check}',
          'backup_config_note'='${PmNetwork.checklist.backup_config_note}',
          'physical_check'='${PmNetwork.checklist.physical_check}',
          'physical_note'='${PmNetwork.checklist.physical_note}',
          'rj45_ceheck'='${PmNetwork.checklist.rj45_ceheck}',
          'rj45_note'='${PmNetwork.checklist.rj45_note}',
          'wallmount_check'='${PmNetwork.checklist.wallmount_check}',
          'wallmount_note'='${PmNetwork.checklist.wallmount_note}' WHERE checklist_pm_network_id='${PmNetwork.checklist.checklist_pm_network_id}';`,
      [],
    );
  });
};
export const deletePmNetwork = async (db, id) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM pm_network_devices where pm_network_device_id='${id}';`,
      [],
    );
    tx.executeSql(
      `DELETE FROM checklist_pm_network_devices where pm_id='${id}';`,
      [],
    );
  });
};

export const totalPmNetwork = async db => {
  const query = `SELECT * FROM pm_network_devices`;
  //const query = `SELECT COUNT (pm_network_device_id) as total FROM pm_network_devices`;
  const result = await db.executeSql(query);
  return result;
};
