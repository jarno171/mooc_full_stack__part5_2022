import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  test('renders content', () => {
    const blog = {
      title: 'testiblogi',
      author: 'testaaja',
      ulr: 'www.testi.com',
      likes: 30
    }

    render(<Blog blog={blog} />)

    screen.getByText('testiblogi')
    screen.getByText('testaaja')

    const urlVisible = screen.queryByText('www.testi.com')
    expect(urlVisible).toBeNull()

    const likesVisible = screen.queryByText('30')
    expect(likesVisible).toBeNull()
  })
})