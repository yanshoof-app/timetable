import RadioButton from '../../forms/RadioButton'
import Image, { StaticImageData } from 'next/image'
import { ThemePreference } from '../../../contexts/Storage/types'

interface option {
  label: string
  value: ThemePreference | boolean
}

export interface image {
  image: StaticImageData
  value: ThemePreference | boolean
}

export interface OptionsLayoutProps {
  options: option[]
  images: image[]
  onChange
  onSave?: unknown
  value
}

export default function OptionsLayout({
  options,
  images,
  onChange,
  onSave,
  value,
}: OptionsLayoutProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <div className="flex justify-evenly">
          {images.map((image, index) => (
            <div className="w-5/12" key={index}>
              <Image
                src={image.image}
                onClick={() => {
                  onChange(image.value)
                  onSave
                }}
                alt=""
              />
            </div>
          ))}
        </div>
        <div
          className={`${
            options.length == 2 ? 'grid grid-cols-2' : 'flex justify-evenly'
          }`}
        >
          {options.map((option, index) => (
            <RadioButton
              selected={value === option.value}
              label={option.label}
              onClick={() => {
                onChange(option.value)
                onSave
              }}
              orientation="horizontal"
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
