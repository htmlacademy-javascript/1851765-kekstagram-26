import { miniaturesArray } from './data.js';
import { createMiniImageList } from './creat-miniatures.js';
import { getBigPictureData } from './big-picture.js';
import { loadPicture} from './form.js';
createMiniImageList(miniaturesArray);
getBigPictureData();
loadPicture();

