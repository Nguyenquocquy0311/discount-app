import { Disclosure } from '@headlessui/react'
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React from 'react'

export type FAQItem = {
  title: string
  content: string
}

const FAQ = ({ faqs, title }: { title: string; faqs: FAQItem[] }) => {
  return (
    <div className="pb-[80px] pt-20">
      <div className="max-w-[1000px] m-auto px-6 tlg:px-0">
        <div className="mb-12 text-center">
          <h2 className="text-[32px] font-semibold leading-[44px]">
            {title}
          </h2>
        </div>
        <ul className="border-t divide-y">
          {(faqs || []).map((item, idx) => (
            <li key={idx}>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center justify-between w-full px-5 py-4 b from-zinc-100 to-zinc-100">
                      <h3 className="block pr-4 font-semibold text-left text-[18px] text-neutral-ink-600">
                        {item.title}
                      </h3>
                      <div className="w-4 text-neutral">
                        {open ? <MinusOutlined /> : <PlusOutlined />}
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className="pb-4 pl-5 pr-16 font-normal text-neutral-ink-600">
                      <p>{item.content}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FAQ
