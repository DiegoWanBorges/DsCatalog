import BoldIcon from 'core/assets/images/bold.svg'
import ItalicIcon from 'core/assets/images/italic.svg'
import ListTopicIcon from 'core/assets/images/list-topic.svg'
import ListNumberIcon from 'core/assets/images/list-number.svg'

const Toolbar = {
  options: ['inline', 'list'],
  inline: {
    bold: { icon: BoldIcon, className: 'custom-icon' },
    italic: { icon: ItalicIcon, className: 'custom-icon' },
    options: ['bold', 'italic'],
  },
  list: {
    options: ['unordered', 'ordered'],
    unordered: { icon: ListTopicIcon, className: 'custom-icon' },
    ordered: { icon: ListNumberIcon, className: 'custom-icon' }
  },
}
export default Toolbar;