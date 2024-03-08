/// <reference types="cypress" /> 
import {faker} from '@faker-js/faker'

describe('tarefas', ()=> {
    
    let testData;

        before(()=> {
            cy.fixture('tasks').then(t =>{
                testData = t
            })
            

        })


    context('cadastro', () =>{
        it('deve cadastrar uma nova tarefa',  ()=> {

            const taskName = 'Ler um livro de Node.js'
    
            cy.removeTaskByName(taskName)
            cy.createTask(taskName)
    
            cy.contains('main div p', taskName)
                .should('be.visible')
                    
        })
    
        it('Não deve permitir tarefa duplicada',  ()=>{

            
    
            const task = testData.dup
    
            cy.removeTaskByName(task.name)
    
            cy.postTask(task)
    
    
            cy.createTask(task.name)
    
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
    
        })
    
        it('Campo obrigatório', ()=>{
            cy.createTask()
            cy.isRequired('This is a required field')
    
        })
    })
    context('atualização',() =>{
        it('deve concluir uma tarefa', ()=> {
            const task ={
                name: 'Estudar cypress',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=_listItemToggle]')
                .click()
            cy.contains('p', task.name)
                .should('have.css','text-decoration-line', 'line-through')


        })
    })
    context('exclusao',() =>{
        it('deve remover uma tarefa', ()=> {
            const task ={
                name: 'Estudar Java',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=_listItemDele]')
                .click()
            cy.contains('p', task.name)
                .should('not.exist')


        })
    })
})
