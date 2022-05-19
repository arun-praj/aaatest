import React, { useEffect } from 'react'
import { useMemo, useState } from 'react'
import Head from 'next/head'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import useAuth from '../hooks/useAuth'
import NavBar from '../components/NavBar'
import BootstrapModal from '../components/Modal'
import AddCardModal from '../components/AddCardModal'
import Accordion from 'react-bootstrap/Accordion'

export default function Home() {
   const me = useAuth()
   const [weekendsVisible, setWeekendsVisible] = useState(true)
   const [showChild, setShowChild] = useState(false)
   const [events, setEvents] = useState([{}])
   const [showModal, setShowModal] = useState(false)
   const [showAddCardModal, setShowAddCardModal] = useState(false)
   const [selectedEvent, setSelectedEvent] = useState(null)
   useEffect(() => {
      setShowChild(true)
   }, [])

   useEffect(() => {
      const events = me?.teams[0]?.syncup_board?.standup_card.map((card) => {
         return {
            title: card.extraNote,
            start: card.created_at,
            id: card.id,
            updated_at: card.updated_at,
            updates: card.updates,
            backgroundColor: 'red',
            borderColor: 'red',
            textColor: 'red',
         }
      })
      setEvents(events)
   }, [me])

   if (!showChild) {
      return null
   }
   if (typeof window === 'undefined') {
      return <></>
   }

   return (
      <div>
         <Head>
            <title>Synchron</title>
            <meta name='description' content='Generated by create next app' />
         </Head>

         <div>
            <NavBar />
            <div
               style={{
                  display: 'flex',
                  marginTop: '32px',
               }}
            >
               <div
                  style={{
                     minHeight: '70vh',
                     flexGrow: 1,
                     padding: '0 56px',
                  }}
               >
                  <FullCalendar
                     plugins={[dayGridPlugin, interactionPlugin]}
                     customButtons={{
                        myCustomButton: {
                           text: 'Add Card',
                           click: function () {
                              setShowAddCardModal(true)
                           },
                        },
                     }}
                     headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'myCustomButton dayGridMonth,dayGridWeek,dayGridDay',
                     }}
                     weekends={weekendsVisible}
                     initialView='dayGridMonth'
                     editable={true}
                     height='85vh'
                     navLinks={true}
                     selectable={true}
                     selectMirror={true}
                     dayMaxEvents={true}
                     eventClick={(eventClickInfo) => {
                        eventClickInfo.jsEvent.preventDefault()
                        setShowModal(true)
                        setSelectedEvent(eventClickInfo.event)
                     }}
                     events={events}
                  />
               </div>
               <div
                  style={{
                     padding: '0 56px 0 0px',
                     width: '256px',
                     // textAlign: 'center',
                  }}
               >
                  <Accordion defaultActiveKey='0'>
                     <Accordion.Item eventKey='0'>
                        <Accordion.Header>Team info</Accordion.Header>
                        <Accordion.Body>
                           <div>
                              {me?.teams?.length > 0 ? (
                                 <div>
                                    {me?.teams.map((team) => {
                                       return (
                                          <ol key={team.id}>
                                             <li>{team.teamName}</li>
                                             {team.users?.map((user) => {
                                                return (
                                                   <ul key={user}>
                                                      <li>{user}</li>
                                                   </ul>
                                                )
                                             })}
                                          </ol>
                                       )
                                    })}
                                 </div>
                              ) : (
                                 <div>You are not in any team.</div>
                              )}
                           </div>
                        </Accordion.Body>
                     </Accordion.Item>
                  </Accordion>

                  <Accordion defaultActiveKey='1'>
                     <Accordion.Item eventKey='1'>
                        <Accordion.Header>Calendar settings</Accordion.Header>
                        <Accordion.Body>
                           <div
                              onClick={() => {
                                 setWeekendsVisible(!weekendsVisible)
                              }}
                           >
                              <input type={'checkbox'} checked={weekendsVisible} readOnly />
                              <label htmlFor='vehicle1'> &nbsp; &nbsp;Display weekend </label>
                           </div>
                        </Accordion.Body>
                     </Accordion.Item>
                  </Accordion>
               </div>
            </div>
         </div>
         <BootstrapModal show={showModal} handleClose={setShowModal} event={selectedEvent} />
         <AddCardModal show={showAddCardModal} handleClose={setShowAddCardModal} />
      </div>
   )
}

export async function getServerSideProps(context) {
   // const data = await res.json()

   return { props: {} }
}
