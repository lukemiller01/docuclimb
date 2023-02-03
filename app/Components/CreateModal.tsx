'use client';

// Headless / Hero
import { Dialog, Transition } from '@headlessui/react'
import { PhotoIcon } from '@heroicons/react/24/outline'

// Input Compontns:
import ColorListBox from './ColorListBox';
import GradeListBox from './GradeListBox';
import SettingSwitch from './SettingSwitch';

// Functional:
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react'
import Image from 'next/image';

export default function CreateModal({isOpen, closeModal}:any) {

  const [selectedColor, setSelectedColor] = useState({color: 'Black'}) // Color
  const [selectedGrade, setSelectedGrade] = useState({grade: 'V0'}) // Grade
  const [enabled, setEnabled] = useState(false) // Indoor / outdoor

  const [selectedImage, setSelectedImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  const router = useRouter();
  // var someDate = new Date();
  // someDate.setDate(someDate.getDate());
  // var today = someDate.toISOString().substring(0, 10);

  const addClimb = async() => {
    const formData = new FormData();
    if(selectedImage) {
      formData.append("image", selectedImage);
      const modified = new Date(selectedImage.lastModified).toISOString().replace('T', ' ');
      formData.append("date", modified);
    }
    formData.append("grade", selectedGrade.grade)
    formData.append("color", selectedColor.color)
    formData.append("environment", enabled.toString())
    
    const data = await axios.post('api/create/', formData)

    // TODO: set all params to null
    router.refresh();
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
                <Dialog.Panel className="w-full max-w-custom transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Add a Climb
                  </Dialog.Title>
                    <form onSubmit={() => addClimb()}>
                        
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                              {selectedImage 
                                ? <Image src={previewImage} alt='uploaded image' width={150} height={0} className='mx-auto'></Image>
                                : <PhotoIcon className="mx-auto h-12 w-12 text-gray-400"/>
                              }
                                
                                <div className="flex text-sm text-gray-600">
                                  <label
                                      htmlFor="file-upload"
                                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                      <span>Upload a file</span>
                                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={({target}) => {
                                        if(target.files) {
                                          // Set file to send to API
                                          const file = target.files[0];
                                          setSelectedImage(file);

                                          // Set URL for preview
                                          setPreviewImage(URL.createObjectURL(file));
                                        }
                                      }}/>
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>

                        <SettingSwitch enabled={enabled} setEnabled={setEnabled}/>

                        <div className='flex flex-row px-2 py-2 gap-2'>
                            { enabled? null : <ColorListBox selected={selectedColor} setSelected={setSelectedColor}/> }
                            <GradeListBox selected={selectedGrade} setSelected={setSelectedGrade}/>
                        </div>

                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                            className="rounded-md bg-brand-green px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-brand-green-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="submit"
                            onClick={closeModal}>
                              Add Climb
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