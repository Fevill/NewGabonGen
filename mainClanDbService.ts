import { ipcMain } from 'electron';
import { Clan } from './src/app/entity';


const getClans = async (clanRepo) => {
  ipcMain.on('getClans', async (event: any, ...args: any[]) => {
    try {
      event.returnValue = await clanRepo.find();
    } catch (err) {
      throw err;
    }
  });
};

const addClan = async (clanRepo) => {
  ipcMain.on('addClan', async (event: any, _item: Clan) => {
    try {
      const item = await clanRepo.create(_item);
      await clanRepo.save(item);
      event.returnValue = await clanRepo.find();
    } catch (err) {
      throw err;
    }
  });
};

const updateClan = async (clanRepo) => {
  ipcMain.on('updateClan', async (event: any, _item: Clan) => {
    try {
      await clanRepo.update(
        _item.id ,
        _item
      );;
      event.returnValue = await clanRepo.find();
    } catch (err) {
      throw err;
    }
  });
};

const deleteClan = async (clanRepo) => {
  ipcMain.on('deleteClan', async (event: any,  _item: Clan) => {
    try {
      const item = await clanRepo.create(_item);
      await clanRepo.remove(item);
      event.returnValue = await clanRepo.find();
    } catch (err) {
      throw err;
    }
  });
};

export { 
  getClans,
  addClan,
  deleteClan,
  updateClan
}

