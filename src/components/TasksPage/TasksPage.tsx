'use client'

import { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { addTask, updateTaskStatus, deleteTask, updateTask, clearAllTasks, Task, TaskStatus } from '@/store/taskSlice'
import { sessionStorageUtils, useHydrateStore } from '@/utils'
import { Navbar, Footer } from '@/components'
import './TasksPage.scss'

export const TasksPage = () => {
  const tasks = useSelector((state: RootState) => state.tasks)
  const dispatch = useDispatch()
  
  // Hydrate store from session storage on client mount
  useHydrateStore()
  
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  
  // Editing state
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  
  // Filtering state
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | TaskStatus>('all')
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      )
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus)
    }

    // Sort tasks - create a copy to avoid mutating the original array
    return [...filtered].sort((a, b) => {
      let comparison = 0
      
      if (sortBy === 'date') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title)
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [tasks, searchQuery, filterStatus, sortBy, sortOrder])

  const todoTasks = filteredAndSortedTasks.filter(task => task.status === 'todo')
  const completedTasks = filteredAndSortedTasks.filter(task => task.status === 'completed')
  const canceledTasks = filteredAndSortedTasks.filter(task => task.status === 'canceled')

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(addTask({ 
        title: newTaskTitle.trim(), 
        description: newTaskDescription.trim() || undefined 
      }))
      setNewTaskTitle('')
      setNewTaskDescription('')
      setIsAddingTask(false)
    }
  }

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault()
    if (draggedTask && draggedTask.status !== status) {
      dispatch(updateTaskStatus({ id: draggedTask.id, status }))
    }
    setDraggedTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId))
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setEditTitle(task.title)
    setEditDescription(task.description || '')
  }

  const handleSaveEdit = () => {
    if (editingTask && editTitle.trim()) {
      dispatch(updateTask({
        id: editingTask.id,
        title: editTitle.trim(),
        description: editDescription.trim() || undefined
      }))
      setEditingTask(null)
      setEditTitle('')
      setEditDescription('')
    }
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
    setEditTitle('')
    setEditDescription('')
  }

  const clearFilters = () => {
    setSearchQuery('')
    setFilterStatus('all')
    setSortBy('date')
    setSortOrder('desc')
  }

  const handleClearAllTasks = () => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      dispatch(clearAllTasks())
      sessionStorageUtils.clearState()
    }
  }

  return (
    <>
      <Navbar />
      <main className="tasks-page">
        <div className="tasks-page__container">
        <div className="tasks-page__title-section">
          <h1 className="tasks-page__title">Task Management</h1>
          <div className="tasks-page__title-actions">
            <button 
              className="tasks-page__add-btn"
              onClick={() => setIsAddingTask(true)}
            >
              + Add New Task
            </button>
            {tasks.length > 0 && (
              <button 
                className="tasks-page__clear-all-btn"
                onClick={handleClearAllTasks}
                title="Clear all tasks from session storage"
              >
                Clear All Tasks
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="tasks-page__filters">
          <div className="tasks-page__search">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="tasks-page__search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="tasks-page__search-clear"
              >
                ×
              </button>
            )}
          </div>

          <div className="tasks-page__filter-controls">
            <select
              id='filter-status'
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | TaskStatus)}
              className="tasks-page__filter-select"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>

            <select
              id='filter-sortby'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
              className="tasks-page__filter-select"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="tasks-page__sort-btn"
              title={`Currently: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>

            {(searchQuery || filterStatus !== 'all' || sortBy !== 'date' || sortOrder !== 'desc') && (
              <button
                onClick={clearFilters}
                className="tasks-page__clear-filters"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="tasks-page__results-info">
            <div className="tasks-page__results-count">
              {filteredAndSortedTasks.length} of {tasks.length} tasks
            </div>
            <div className="tasks-page__persistence-status">
              💾 Auto-saved to session
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        {isAddingTask && (
          <div className="tasks-page__add-form">
            <div className="tasks-page__add-form-content">
              <input
                id='new-task-title'
                type="text"
                placeholder="Task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="tasks-page__add-input"
                autoFocus
              />
              <textarea
                id='new-task-description'
                placeholder="Task description (optional)..."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="tasks-page__add-textarea"
                rows={3}
              />
              <div className="tasks-page__add-actions">
                <button 
                  onClick={handleAddTask}
                  className="tasks-page__add-save"
                  disabled={!newTaskTitle.trim()}
                >
                  Add Task
                </button>
                <button 
                  onClick={() => {
                    setIsAddingTask(false)
                    setNewTaskTitle('')
                    setNewTaskDescription('')
                  }}
                  className="tasks-page__add-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Columns */}
        <div className="tasks-page__columns">
          {/* Todo Column */}
          <div 
            className="tasks-page__column tasks-page__column--todo"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'todo')}
          >
            <div className="tasks-page__column-header">
              <h2 className="tasks-page__column-title">To Do</h2>
              <span className="tasks-page__column-count">{todoTasks.length}</span>
            </div>
            <div className="tasks-page__task-list">
              {todoTasks.map(task => (
                <div
                  key={task.id}
                  className="tasks-page__task"
                  draggable={!editingTask}
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  {editingTask?.id === task.id ? (
                    <div className="tasks-page__task-edit">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="tasks-page__edit-input"
                        autoFocus
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="tasks-page__edit-textarea"
                        rows={2}
                        placeholder="Description (optional)..."
                      />
                      <div className="tasks-page__edit-actions">
                        <button
                          onClick={handleSaveEdit}
                          className="tasks-page__edit-save"
                          disabled={!editTitle.trim()}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="tasks-page__edit-cancel"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="tasks-page__task-content">
                        <h3 className="tasks-page__task-title">{task.title}</h3>
                        {task.description && (
                          <p className="tasks-page__task-description">{task.description}</p>
                        )}
                        <div className="tasks-page__task-meta">
                          <span className="tasks-page__task-date">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="tasks-page__task-actions">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="tasks-page__task-edit-btn"
                          title="Edit task"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="tasks-page__task-delete"
                          title="Delete task"
                        >
                          ×
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {todoTasks.length === 0 && (
                <div className="tasks-page__empty-state">
                  <p>No tasks yet. Create your first task!</p>
                </div>
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div 
            className="tasks-page__column tasks-page__column--completed"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'completed')}
          >
            <div className="tasks-page__column-header">
              <h2 className="tasks-page__column-title">Completed</h2>
              <span className="tasks-page__column-count">{completedTasks.length}</span>
            </div>
            <div className="tasks-page__task-list">
              {completedTasks.map(task => (
                <div
                  key={task.id}
                  className="tasks-page__task tasks-page__task--completed"
                  draggable={!editingTask}
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  {editingTask?.id === task.id ? (
                    <div className="tasks-page__task-edit">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="tasks-page__edit-input"
                        autoFocus
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="tasks-page__edit-textarea"
                        rows={2}
                        placeholder="Description (optional)..."
                      />
                      <div className="tasks-page__edit-actions">
                        <button
                          onClick={handleSaveEdit}
                          className="tasks-page__edit-save"
                          disabled={!editTitle.trim()}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="tasks-page__edit-cancel"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="tasks-page__task-content">
                        <h3 className="tasks-page__task-title">{task.title}</h3>
                        {task.description && (
                          <p className="tasks-page__task-description">{task.description}</p>
                        )}
                        <div className="tasks-page__task-meta">
                          <span className="tasks-page__task-date">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="tasks-page__task-actions">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="tasks-page__task-edit-btn"
                          title="Edit task"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="tasks-page__task-delete"
                          title="Delete task"
                        >
                          ×
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {completedTasks.length === 0 && (
                <div className="tasks-page__empty-state">
                  <p>Drag completed tasks here</p>
                </div>
              )}
            </div>
          </div>

          {/* Canceled Column */}
          <div 
            className="tasks-page__column tasks-page__column--canceled"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'canceled')}
          >
            <div className="tasks-page__column-header">
              <h2 className="tasks-page__column-title">Canceled</h2>
              <span className="tasks-page__column-count">{canceledTasks.length}</span>
            </div>
            <div className="tasks-page__task-list">
              {canceledTasks.map(task => (
                <div
                  key={task.id}
                  className="tasks-page__task tasks-page__task--canceled"
                  draggable={!editingTask}
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  {editingTask?.id === task.id ? (
                    <div className="tasks-page__task-edit">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="tasks-page__edit-input"
                        autoFocus
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="tasks-page__edit-textarea"
                        rows={2}
                        placeholder="Description (optional)..."
                      />
                      <div className="tasks-page__edit-actions">
                        <button
                          onClick={handleSaveEdit}
                          className="tasks-page__edit-save"
                          disabled={!editTitle.trim()}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="tasks-page__edit-cancel"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="tasks-page__task-content">
                        <h3 className="tasks-page__task-title">{task.title}</h3>
                        {task.description && (
                          <p className="tasks-page__task-description">{task.description}</p>
                        )}
                        <div className="tasks-page__task-meta">
                          <span className="tasks-page__task-date">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="tasks-page__task-actions">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="tasks-page__task-edit-btn"
                          title="Edit task"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="tasks-page__task-delete"
                          title="Delete task"
                        >
                          ×
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {canceledTasks.length === 0 && (
                <div className="tasks-page__empty-state">
                  <p>Drag canceled tasks here</p>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </>
  )
}