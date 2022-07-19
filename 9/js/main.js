import { miniaturesArray} from './data.js';
import { createMiniImageList } from './creat-miniatures.js';
//import { viewBigPicture } from './big-picture.js';
import './big-picture.js';
import { loadYourPicture } from './form.js';
import { controlScaleImage } from './control-scale-image.js';
import { addEffectsImage } from './filter-image.js';
import { viewBigPicture } from './big-picture.js';
createMiniImageList(miniaturesArray);
viewBigPicture();
loadYourPicture();
controlScaleImage();
addEffectsImage();


