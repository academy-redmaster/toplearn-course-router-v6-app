import { Todo } from '../../model/todos';
import { validationID } from '../../utils/validationID';

// !----------------------------------------------------------------
export const fetchTodosController = async (req, res) => {
   try {
      const todos = await Todo.find({}).populate("owner");
      res.json(todos);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const fetchTodosDelayController = async (req, res) => {
   try {
      await Bun.sleep(10000);

      const todos = await Todo.find({}).populate("owner");
      res.json(todos);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// !----------------------------------------------------------------
export const createTodoController = async (req, res) => {
   try {
      const { title, description, dueDate, priority, owner } = req.body;

      const todo = await Todo.create({
         title,
         description,
         dueDate,
         priority,
         owner
      });

      res.status(201).json(todo);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const getTodoDetailsController = async (req, res) => {
   const { id } = req.params;
   validationID(id);
   try {
      const todo = await Todo.findById(id).populate("owner");
      if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const updateTodoController = async (req, res) => {
   const { id } = req.params;
   const { title, description, status, dueDate, priority } = req.body;
   validationID(id);

   try {
      const todo = await Todo.findByIdAndUpdate(id, { title, description, status, dueDate, priority }, { new: true });
      if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const markTodoAsCompletedController = async (req, res) => {
   const { id } = req.params;
   validationID(id);

   try {
      const todo = await Todo.findByIdAndUpdate(id, { status: 'completed', isCompleted: true }, { new: true });
      if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const archiveTodoController = async (req, res) => {
   const { id } = req.params;
   validationID(id);

   try {
      const todo = await Todo.findByIdAndUpdate(id, { status: 'archived', isArchived: true }, { new: true });
      if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const unarchiveTodoController = async (req, res) => {
   const { id } = req.params;
   validationID(id);

   try {
      const todo = await Todo.findByIdAndUpdate(
         id,
         { status: 'pending', isArchived: false, isCompleted: false },
         { new: true }
      );
      if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
export const deleteTodoController = async (req, res) => {
   const { id } = req.params;
   validationID(id);

   try {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
         return res.status(404).json({ message: 'Todo not found' });
      }
      res.json({ message: 'Todo successfully deleted' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
// !----------------------------------------------------------------
