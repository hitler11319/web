class Data:

	def __init__(self):
		self.name = ""
		self.id = -1

	def set(self, name, id):
		self.name = name
		self.id = id

	def get_name(self):
		return self.name

	def get_id(self):
		return self.id