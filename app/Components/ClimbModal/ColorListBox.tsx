// Functional
import { Fragment } from 'react'

// Components
import { Listbox, Transition } from '@headlessui/react'

// Icons
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const color = [
  { color: 'Black' },
  { color: 'White' },
  { color: 'Red' },
  { color: 'Orange' },
  { color: 'Yellow' },
  { color: 'Green' },
  { color: 'Blue' },
  { color: 'Purple' },
  { color: 'Pink' },
  { color: 'Other' },
]

interface ColorState {
  selected: {
    color: string,
  }
  setSelected: React.Dispatch<React.SetStateAction<{color: string}>>,
}

export default function ColorListBox({selected, setSelected}: ColorState) {

  return (
    <div className="top-16 w-72 mx-auto">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
            <span className="block truncate">{selected.color}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm z-10">
              {color.map((color, colorIdx) => (
                <Listbox.Option
                  key={colorIdx}
                  className={`relative cursor-default select-none py-2 pl-10 pr-4 `}
                  value={color}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {color.color}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}