'use client'

import { gql, useMutation, useQuery } from '@apollo/client'
import { formatDateAndTime } from '../../../../quartz/formatDateAndTime'
import styles from './page.module.css'
import classNames from 'classnames'

const BOOKINGS = gql`
  query Bookings {
    bookings {
      id
      customerName
      customerEmail
      startAt
      endAt
      status
      service {
        name
      }
    }
  }
`

const CANCEL = gql`
  mutation CancelBooking($id: ID!) {
    cancelBooking(id: $id) {
      id
      status
    }
  }
`

export default function AdminBookingsPage() {
  const { data, loading, error, refetch } = useQuery(BOOKINGS)
  const [cancelBooking, { loading: cancelling }] = useMutation(CANCEL)

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>
  if (error) return <div style={{ padding: 24 }}>Error: {error.message}</div>

  const bookings = data?.bookings ?? []

  return (
    <main className={styles.main}>
      <p className={styles.heading}>Admin | Bookings</p>

      <div className={styles.bookings}>
        {bookings.length === 0 ? (
          <div>No bookings yet.</div>
        ) : (
          bookings.map((b: any) => {
            const start = formatDateAndTime(b.startAt)
            const end = formatDateAndTime(b.endAt)

            return (
              <div
                key={b.id}
                className={styles.bookItem}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>
                    {b.service.name}: {start.day}, {start.time} - {' '}
                    {end.time}
                  </div>
                  <div className={styles.clientName}>
                    {b.customerName}, {b.customerEmail} | {b.status}
                  </div>
                </div>

                <button
                  className={classNames(styles.appointmentBtn, {
                    [styles.confirmed]: b.status === 'CONFIRMED'
                  })}
                  disabled={cancelling || b.status !== 'CONFIRMED'}
                  onClick={async () => {
                    await cancelBooking({ variables: { id: b.id } })
                    await refetch()
                  }}
                >
                  Cancel
                </button>
              </div>
            )
          })
        )}
      </div>
    </main>
  )
}
