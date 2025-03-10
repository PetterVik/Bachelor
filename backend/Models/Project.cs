namespace PureLogicBackend.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string? Title { get; set; } //Makes it possible to have no value
        public string? Description { get; set; } //Makes it possible to have no value
        public string? ImageUrl { get; set; } //Makes it possible to have no value
    }
}
