'use client';

// Headless / Hero
import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Input Compontns:
import ColorListBox from './ColorListBox';
import GradeListBox from './GradeListBox';
import SettingSwitch from './SettingSwitch';

// Functional:
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import Image from 'next/image';

export default function CreateModal({isOpen, closeModal, actionType, id, climb, url, currentUser, profile}:any) {

  const [selectedColor, setSelectedColor] = useState(climb? {color: climb.color} : {color: 'Black'}) // Color
  const [selectedGrade, setSelectedGrade] = useState(climb? {grade: climb.grade} : {grade: 'V0'}) // Grade
  const [enabled, setEnabled] = useState(climb? climb.environment : false) // Indoor / outdoor

  const [selectedImage, setSelectedImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState(climb? url : "");

  const [baseImage, setBaseImage] = useState<File>();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const router = useRouter();

  function readAsDataURL(file:File) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onerror = reject;
        fr.onload = () => {
            resolve(fr.result);
        }
        fr.readAsDataURL(file);
    });
  }

  const addClimb = async(e:any) => {
    e.preventDefault();
    setButtonDisabled(true)

    // Set formData for internal API
    const formData = new FormData();
    if(selectedImage) {
      formData.append("image", selectedImage);
      const modified = new Date(selectedImage.lastModified).toISOString().replace('T', ' ');
      formData.append("date", modified);
    }
    if(baseImage) {
      try {
        const base64 = await readAsDataURL(baseImage) as string;
        formData.append("base64", base64);
      } catch (error) {
          console.log(error)
      }
    }
    formData.append("grade", selectedGrade.grade);
    formData.append("color", selectedColor.color);
    formData.append("environment", enabled.toString());
    formData.append("uid", currentUser);

    if (actionType === 'Create' && profile ) { // Call create method from profile
      await axios.post('../../api/create/', formData);
    }
    else if(actionType === 'Create') { // Call create method from Navbar
      await axios.post('../api/create/', formData);
    }
    else if (actionType === 'Edit' && profile) {  // Call edit method from profile
      await axios.patch(`../../api/edit/${id}`, formData);
    }
    else if(actionType === 'Edit') { // Call edit method from Navbar
      await axios.patch(`../api/edit/${id}`, formData);
    }

    router.refresh();
    window.scrollTo(0, 0)
    setButtonDisabled(false);
    closeModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <form onSubmit={(e) => addClimb(e)}>
                        
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                              {loadingImage 
                                ? <ArrowPathIcon className="animate-spin h-12 w-12 mx-auto"></ArrowPathIcon>
                                : previewImage? <Image src={previewImage} alt='uploaded image' width={112} height={150} className='mx-auto w-auto' placeholder="blur" blurDataURL={`${climb.base64}`}></Image> : <PhotoIcon className="mx-auto h-12 w-12" />
                              }
                                
                                <div className="flex text-sm text-gray-600">
                                  <label
                                      htmlFor="file-upload"
                                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                      <span>Upload a file</span>
                                      <input id="file-upload" type="file" className="sr-only" accept=".png, .jpg, .jpeg, .heic, .heif" onChange={ async ({target}) => {
                                        if(target.files) {
                                          setLoadingImage(true);
                                          var imageFile = target.files[0];

                                          // If the image is an heic file, convert it into a blob
                                          if (imageFile.type === "image/heic") {
                                            // Get the params from the file
                                            const lastModified = imageFile.lastModified;
                                            const name = imageFile.name;
                                            // Convert to JPEG
                                            const heic2any = (await import("heic2any")).default;
                                            const newBlob: any = await heic2any({ blob: imageFile});
                                            newBlob.lastModified = lastModified;
                                            newBlob.name = name;
                                            // Set the file again
                                            imageFile = newBlob;
                                          }

                                          const imageCompression = (await import("browser-image-compression")).default;

                                          // Compress image into base64 for blur preview
                                          const options2 = { // Set the maximum file size
                                            maxWidthOrHeight: 50,
                                            useWebWorker: true
                                          }
                                          const compressedFile2 = await imageCompression(imageFile, options2);
                                          setBaseImage(compressedFile2);

                                          // If the file size is larger than 1MB, compress to ~1MB
                                          if(imageFile.size > 1000000) {
                                            // Clip the size of the image
                                            const options = { // Set the maximum file size
                                              maxSizeMB: 1,
                                              useWebWorker: true
                                            }
                                            try { // Compress the image.
                                              const compressedFile = await imageCompression(imageFile, options);
                                              imageFile = compressedFile;
                                            } catch (error) {
                                              console.log(error);
                                            }
                                          }

                                          // Finish image computations
                                          setLoadingImage(false);
                                          setSelectedImage(imageFile);

                                          // Set URL for preview
                                          setPreviewImage(URL.createObjectURL(imageFile));
                                        }
                                      }}/>
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, HEIC/HEIF</p>
                            </div>
                        </div>

                        <SettingSwitch enabled={enabled} setEnabled={setEnabled} value={climb !== undefined ? climb.environment : null}/>

                        <div className='flex flex-row px-2 py-2 gap-2'>
                            { enabled? null : <ColorListBox selected={selectedColor} setSelected={setSelectedColor}/> }
                            <GradeListBox selected={selectedGrade} setSelected={setSelectedGrade}/>
                        </div>

                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                            className="rounded-md bg-brand-green px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-brand-green-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="submit"
                            id='action-button'
                            disabled={buttonDisabled}
                            >
                              {buttonDisabled
                              ? <ArrowPathIcon className="animate-spin h-5 w-5"></ArrowPathIcon>
                              : actionType + ' Climb' }
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}